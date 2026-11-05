<?php

declare(strict_types=1);

function agenda_defaults(): array
{
    return ['enabled' => false, 'step' => 15, 'weekly' => array_fill(1, 7, []), 'weekly_unavailable' => array_fill(1, 7, []), 'blocks' => [], 'extra_available' => []];
}
function agenda_config(): array
{
    $raw = query('SELECT data FROM agenda_settings WHERE id=1')->fetchColumn();
    return $raw ? array_replace(agenda_defaults(), json_decode($raw, true, 512, JSON_THROW_ON_ERROR)) : agenda_defaults();
}
function agenda_minutes(string $time, bool $end = false): int
{
    if ($end && $time === '24:00') return 1440;
    if (!preg_match('/^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/D', $time)) throw new ValidationError('Hora no válida. Usa HH:MM.');
    return (int)substr($time, 0, 2) * 60 + (int)substr($time, 3, 2);
}
function agenda_date(string $date): DateTimeImmutable
{
    $day = DateTimeImmutable::createFromFormat('!Y-m-d', $date, new DateTimeZone('Europe/Madrid'));
    if (!$day || $day->format('Y-m-d') !== $date) throw new ValidationError('Fecha no válida.');
    return $day;
}
function agenda_validate(array $d): array {
    // Convierte también los objetos internos en arrays.
    $d = json_decode(
        json_encode($d, JSON_THROW_ON_ERROR),
        true,
        512,
        JSON_THROW_ON_ERROR
    );
    $c = agenda_defaults();
    $c['enabled'] = ($d['enabled'] ?? false) === true;
    if (!in_array($d['step'] ?? 15, [5, 15, 30, 60], true)) throw new ValidationError('Intervalo de horas no válido.');
    $c['step'] = $d['step'] ?? 15;
    for ($n = 1; $n <= 7; $n++) {
        $ranges = $d['weekly'][$n] ?? [];
        if (!is_array($ranges) || count($ranges) > 8) throw new ValidationError('Máximo ocho franjas por día.');
        foreach ($ranges as $range) {
            if (!is_array($range) || count($range) !== 2 || !is_string($range[0]) || !is_string($range[1])) throw new ValidationError('Franja no válida.');
            $a = agenda_minutes($range[0]);
            $b = agenda_minutes($range[1], true);
            if ($b <= $a) throw new ValidationError('Cada franja debe terminar después de comenzar, dentro del mismo día.');
            $c['weekly'][$n][] = [$range[0], $range[1]];
        }
        usort($c['weekly'][$n], fn($a, $b) => strcmp($a[0], $b[0]));
        $last = -1;
        foreach ($c['weekly'][$n] as $range) {
            if (agenda_minutes($range[0]) < $last) throw new ValidationError('Hay franjas habituales que se solapan.');
            $last = agenda_minutes($range[1], true);
        }
    }
    if (isset($d['weekly_unavailable'])) {
        $validated = agenda_validate(['weekly' => $d['weekly_unavailable']]);
        $c['weekly_unavailable'] = $validated['weekly'];
    }
    if (!is_array($d['blocks'] ?? []) || count($d['blocks'] ?? []) > 500) throw new ValidationError('Máximo 500 bloqueos.');
    foreach ($d['blocks'] ?? [] as $block) {
        if (!is_array($block)) throw new ValidationError('Bloqueo no válido.');
        $date = txt($block['date'] ?? '', 10, true);
        agenda_date($date);
        $start = txt($block['start'] ?? '', 5, true);
        $end = txt($block['end'] ?? '', 5, true);
        if (agenda_minutes($end, true) <= agenda_minutes($start)) throw new ValidationError('El bloqueo debe terminar después de comenzar.');
        $c['blocks'][] = ['date' => $date, 'start' => $start, 'end' => $end, 'note' => txt($block['note'] ?? '', 160)];
    }
    if (!is_array($d['extra_available'] ?? []) || count($d['extra_available'] ?? []) > 500) throw new ValidationError('Máximo 500 aperturas puntuales.');
    foreach ($d['extra_available'] ?? [] as $extra) {
        if (!is_array($extra)) throw new ValidationError('Apertura no válida.');
        $date=txt($extra['date']??'',10,true); agenda_date($date);
        $start=txt($extra['start']??'',5,true); $end=txt($extra['end']??'',5,true);
        if(agenda_minutes($end,true)<=agenda_minutes($start)) throw new ValidationError('La apertura debe terminar después de comenzar.');
        $c['extra_available'][]=['date'=>$date,'start'=>$start,'end'=>$end,'note'=>txt($extra['note']??'',160)];
    }
    if ($c['enabled'] && !array_filter($c['weekly']) && !$c['extra_available']) throw new ValidationError('Añade al menos una franja habitual antes de activar la agenda.');
    return $c;
}
function agenda_duration(string $value): int
{
    $s = strtolower(trim(str_replace(',', '.', $value)));
    if (preg_match('/^(\d{1,2}):(\d{2})$/D', $s, $m)) return max(15, (int)$m[1] * 60 + (int)$m[2]);
    if (preg_match('/(\d+(?:\.\d+)?)\s*(?:h|hora)/u', $s, $m)) {
        $minutes = (int)round((float)$m[1] * 60);
        if (preg_match('/h(?:oras?)?\s*(\d{1,2})\s*(?:min|m)?/u', $s, $extra)) $minutes += (int)$extra[1];
        return max(15, $minutes);
    }
    if (preg_match('/^(\d+(?:\.\d+)?)$/D', $s)) return max(15, (int)round((float)$s * 60));
    if (preg_match('/(\d+)\s*min/u', $s, $m)) return max(15, (int)$m[1]);
    return 240; // Duración desconocida: reserva 4 h en la agenda, visible en el admin.
}
function agenda_local(DateTimeImmutable $day, int $minute): ?DateTimeImmutable
{
    if ($minute === 1440) return $day->modify('+1 day');
    $text = $day->format('Y-m-d') . ' ' . sprintf('%02d:%02d', intdiv($minute, 60), $minute % 60);
    $t = DateTimeImmutable::createFromFormat('!Y-m-d H:i', $text, new DateTimeZone('Europe/Madrid'));
    if (!$t || $t->format('Y-m-d H:i') !== $text) return null;
    // Las horas duplicadas del cambio de invierno se dejan a consulta.
    foreach ([-3600, 3600] as $delta) if ($t->setTimestamp($t->getTimestamp() + $delta)->format('Y-m-d H:i') === $text) return null;
    return $t;
}
function agenda_slots(string $date, int $duration, ?array $config = null, ?array $scheduled = null): array
{
    if ($duration < 15 || $duration > 720) throw new ValidationError('Duración admitida: de 15 minutos a 12 horas.');
    $day = agenda_date($date);
    $c = $config ?? agenda_config();
    $out = ['enabled' => (bool)$c['enabled'], 'date' => $date, 'duration' => $duration, 'timezone' => 'Europe/Madrid', 'slots' => []];
    if (!$c['enabled']) return $out;
    $now = new DateTimeImmutable('now', new DateTimeZone('Europe/Madrid'));
    if ($date < $now->format('Y-m-d') || $date > $now->modify('+365 days')->format('Y-m-d')) return $out;
    $busy = [];
    $blocks = $c['blocks'];
    $extraRanges=[];
    foreach($c['extra_available']??[] as $extra) if($extra['date']===$date) $extraRanges[]=[agenda_minutes($extra['start']),agenda_minutes($extra['end'],true)];
    $weeklyBusy=[];
    foreach($c['weekly_unavailable'][(int)$day->format('N')]??[] as $range) {
        $pieces=[[agenda_minutes($range[0]),agenda_minutes($range[1],true)]];
        foreach($extraRanges as [$x,$y]) {
            $remaining=[];
            foreach($pieces as [$a,$b]) {
                if($b<=$x || $a>=$y){$remaining[]=[$a,$b];continue;}
                if($a<$x)$remaining[]=[$a,$x];
                if($b>$y)$remaining[]=[$y,$b];
            }
            $pieces=$remaining;
        }
        foreach($pieces as [$a,$b]) {
            $start=agenda_local($day,$a);$end=agenda_local($day,$b);
            if(!$start||!$end)return $out;
            $weeklyBusy[]=[$start->getTimestamp(),$end->getTimestamp()];
        }
    }
    $busy=$weeklyBusy;
    foreach ($blocks as $block) if ($block['date'] === $date) {
        $a = agenda_local($day, agenda_minutes($block['start']));
        $b = agenda_local($day, agenda_minutes($block['end'], true));
        if (!$a || !$b) return $out; // Bloqueo ambiguo: no ofrecer horas incorrectas.
        $busy[] = [$a->getTimestamp(), $b->getTimestamp()];
    }
    $scheduled = $scheduled ?? query("SELECT starts,duration FROM games WHERE status<>'cancelled'")->fetchAll();
    foreach ($scheduled as $game) {
        $a = new DateTimeImmutable($game['starts']);
        $busy[] = [$a->getTimestamp(), $a->getTimestamp() + agenda_duration((string)$game['duration']) * 60];
    }
    if(function_exists('game_requests_installed') && game_requests_installed()) {
        foreach(query("SELECT starts,duration FROM game_requests WHERE status='confirmed'")->fetchAll() as $request) {
            $a=(new DateTimeImmutable($request['starts']))->getTimestamp();
            $busy[]=[$a,$a+(int)$request['duration']*60];
        }
    }
    $found = [];
    $ranges=[];
    foreach($c['weekly'][(int)$day->format('N')]??[] as $range)$ranges[]=[agenda_minutes($range[0]),agenda_minutes($range[1],true)];
    $ranges=array_merge($ranges,$extraRanges);
    usort($ranges,fn($a,$b)=>$a[0]<=>$b[0]);$merged=[];
    foreach($ranges as [$a,$b]) {
        $last=count($merged)-1;
        if($last>=0 && $a<=$merged[$last][1])$merged[$last][1]=max($b,$merged[$last][1]);else $merged[]=[$a,$b];
    }
    foreach ($merged as [$rangeStart,$rangeEnd]) {
        $range=[sprintf('%02d:%02d',intdiv($rangeStart,60),$rangeStart%60),sprintf('%02d:%02d',intdiv($rangeEnd,60),$rangeEnd%60)];
        $end = agenda_local($day, agenda_minutes($range[1], true));
        if (!$end) continue;
        for ($minute = agenda_minutes($range[0]); $minute < agenda_minutes($range[1], true); $minute += (int)$c['step']) {
            $start = agenda_local($day, $minute);
            if (!$start || $start <= $now) continue;
            $a = $start->getTimestamp();
            $b = $a + $duration * 60;
            if ($b > $end->getTimestamp()) continue;
            // No ofrecer sesiones atravesando un cambio de hora.
            if ($start->getOffset() !== $start->setTimestamp($b)->getOffset()) continue;
            $overlap = false;
            foreach ($busy as [$x, $y]) if ($a < $y && $b > $x) {
                $overlap = true;
                break;
            }
            if (!$overlap) $found[$start->format('H:i')] = true;
        }
    }
    $out['slots'] = array_keys($found);
    sort($out['slots']);
    return $out;
}

function agenda_next(string $after,int $duration): array {
    $start=agenda_date($after);$config=agenda_config();
    $today=new DateTimeImmutable('today',new DateTimeZone('Europe/Madrid'));
    $last=$today->modify('+365 days');
    if($start<$today)$start=$today->modify('-1 day');
    if($start>$last)throw new ValidationError('Busca dentro del próximo año.');
    if($duration<15||$duration>720)throw new ValidationError('Duración no válida.');
    if(!$config['enabled'])return ['enabled'=>false,'date'=>null,'slots'=>[]];
    $games=query("SELECT starts,duration FROM games WHERE status<>'cancelled'")->fetchAll();
    for($day=$start->modify('+1 day');$day<=$last;$day=$day->modify('+1 day')) {
        $result=agenda_slots($day->format('Y-m-d'),$duration,$config,$games);
        if($result['slots'])return $result;
    }
    return ['enabled'=>true,'date'=>null,'slots'=>[],'searched_until'=>$last->format('Y-m-d')];
}
