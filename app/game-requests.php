<?php
declare(strict_types=1);
function game_requests_installed(): bool {
    static $installed=null;
    if($installed===null)$installed=(bool)query("SHOW TABLES LIKE 'game_requests'")->fetchColumn();
    return $installed;
}
function game_request_rows(?string $user=null): array {
    if(!game_requests_installed())return [];
    $rows=$user===null ? query('SELECT * FROM game_requests ORDER BY created DESC')->fetchAll() : query('SELECT * FROM game_requests WHERE user_id=? ORDER BY starts DESC',[$user])->fetchAll();
    foreach($rows as &$r){
        $r['request_type']='commissioned';$r['game_title']=$r['title'];
        $r['data']=json_decode($r['data'],true,512,JSON_THROW_ON_ERROR);
        $r['players']=(int)$r['data']['players'];$r['paid']=(bool)$r['paid'];$r['archived']=(bool)$r['archived'];
        $r['mode']=$r['data']['mode'];$r['duration']=str_replace('.',',',(string)((int)$r['duration']/60)).' horas';
    }unset($r);return $rows;
}
function game_request_submit(array $d): array {
    if(!game_requests_installed())throw new ValidationError('Importa database/solicitudes-partidas.sql para activar las solicitudes en la web.');
    if((session('expires', 0))<=time() || !hash_equals((string)(session('mazmorra_csrf', '')),(string)(request()->header('X-Mazmorra-CSRF', ''))) || !session('mazmorra_csrf'))throw new ValidationError('Recarga la página y vuelve a enviar la solicitud.');
    $token=txt($d['request_token']??'',64,true);
    if(!preg_match('/^[a-f0-9]{32}$/D',$token))throw new ValidationError('Referencia de envío no válida.');
    $id=substr(hash('sha256',session()->getId().'|'.$token),0,32);
    // Serializa envíos del mismo formulario y confirmaciones en esta agenda.
    rate_limit('game-request',12,900);
    db()->beginTransaction();query('SELECT id FROM agenda_settings WHERE id=1 FOR UPDATE')->fetch();
    if(query('SELECT id FROM game_requests WHERE id=?',[$id])->fetch()){db()->commit();return ['ok'=>true,'reference'=>$id];}
    $clean=[];
    foreach(['name'=>80,'contact'=>200,'kind'=>30,'adventure'=>200,'idea'=>3000,'format'=>100,'group'=>100,'experience'=>200,'level'=>100,'mode'=>100,'location'=>300,'availability'=>2000,'frequency'=>100,'notes'=>3000,'smallGroup'=>30] as $key=>$limit)$clean[$key]=txt($d[$key]??'',$limit,in_array($key,['name','contact','kind','format','mode'],true));
    $clean['players']=number($d['players']??null,1,30);
    $hours=(string)($d['duration']??'');if(!in_array($hours,['2','2.5','3','4'],true))throw new ValidationError('Duración no válida.');
    $minutes=(int)round((float)$hours*60);$clean['duration']=$hours;
    if(!in_array($clean['kind'],['mia','oficial','personalizada'],true))throw new ValidationError('Tipo de aventura no válido.');
    if($clean['kind']!=='personalizada'){
        $adventure=null;foreach(commissioned_games() as $item)if(($item['title']??'')===$clean['adventure']&&($item['origin']??'')===$clean['kind']&&!empty($item['published'])){$adventure=$item;break;}
        if(!$adventure)throw new ValidationError('Esta aventura ya no está disponible para solicitar.');
        $single=preg_match('/partida .nica|one.?shot|una sola sesi.n/iu',(string)$adventure['format']);
        if(($single && $minutes!==240)||(!$single && $minutes===240))throw new ValidationError('Revisa la duración de esta aventura.');
        $title=$clean['adventure'];
    }else $title='Partida personalizada';
    $rate=$clean['kind']==='personalizada'?($minutes===240?15:5):($adventure['hourly_rate']??null);
    $clean['price_estimate']='A consultar';
    if($clean['players']>=3&&$clean['players']<=5&&is_numeric($rate)&&((float)$rate)>0){
        $perPerson=(float)$rate*($minutes===240?1:$minutes/60);
        $clean['price_estimate']=($clean['kind']==='personalizada'?'Desde ':'').number_format($perPerson,2,',','.').' € por jugador y sesión; grupo: '.number_format($perPerson*$clean['players'],2,',','.').' €. Pendiente de confirmación.';
    }
    $date=txt($d['date1']??'',10,true);$time=txt($d['time1']??'',5,true);
    $start=agenda_local(agenda_date($date),agenda_minutes($time));
    if(!$start || $start<=new DateTimeImmutable('now'))throw new ValidationError('Selecciona una fecha y hora futuras válidas.');
    $slots=agenda_slots($date,$minutes);
    if($slots['enabled']&&!in_array($time,$slots['slots'],true))throw new ValidationError('Este horario ya no está disponible. Elige otro inicio.');
    $clean['date1']=$date;$clean['time1']=$time;
    $uid=session('user_id');
    query('INSERT INTO game_requests (id,user_id,name,contact,title,starts,duration,data) VALUES(?,?,?,?,?,?,?,?)',[$id,$uid,$clean['name'],$clean['contact'],$title,$start->setTimezone(new DateTimeZone('UTC'))->format('Y-m-d\TH:i:s\Z'),$minutes,json_encode($clean,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR)]);
    db()->commit();return ['ok'=>true,'reference'=>$id];
}
function game_request_manage(array $d): array {
    if(!game_requests_installed())throw new ValidationError('Importa database/solicitudes-partidas.sql.');
    $id=txt($d['id']??'',32,true);
    db()->beginTransaction();query('SELECT id FROM agenda_settings WHERE id=1 FOR UPDATE')->fetch();
    $r=query('SELECT * FROM game_requests WHERE id=? FOR UPDATE',[$id])->fetch();
    if(!$r)throw new ValidationError('Solicitud no encontrada.');
    if(array_key_exists('archived',$d)){
        if(!is_bool($d['archived']))throw new ValidationError('Acción no válida.');
        if($d['archived']&&!in_array($r['status'],['rejected','cancelled'],true))throw new ValidationError('Solo puedes archivar solicitudes rechazadas o canceladas.');
        query('UPDATE game_requests SET archived=? WHERE id=?',[(int)$d['archived'],$id]);db()->commit();return ['ok'=>true,'message'=>'Solicitud actualizada.'];
    }
    if($r['archived'])throw new ValidationError('Restaura la solicitud antes de modificarla.');
    $status=$d['status']??'';if(!in_array($status,['pending','confirmed','rejected','cancelled'],true))throw new ValidationError('Estado no válido.');
    $newConfirm=$status==='confirmed'&&$r['status']!=='confirmed';
    if($newConfirm){
        $start=new DateTimeImmutable($r['starts']);$now=new DateTimeImmutable('now');$a=$start->getTimestamp();$b=$a+(int)$r['duration']*60;
        if($a<=$now->getTimestamp())throw new ValidationError('La fecha propuesta ya ha pasado.');
        if($a-$now->getTimestamp()<86400&&($d['accept_short_notice']??false)!==true)throw new ValidationError('Faltan menos de 24 horas. Marca la excepción acordada con el grupo.');
        $local=$start->setTimezone(new DateTimeZone('Europe/Madrid'));
        $available=agenda_slots($local->format('Y-m-d'),(int)$r['duration']);
        if($available['enabled']&&!in_array($local->format('H:i'),$available['slots'],true))throw new ValidationError('Ya no cabe en la agenda. Revisa horarios, bloqueos y partidas confirmadas.');
        $busy=query("SELECT starts,duration FROM game_requests WHERE status='confirmed' AND id<>?",[$id])->fetchAll();
        foreach(query("SELECT starts,duration FROM games WHERE status<>'cancelled'")->fetchAll() as $g){$g['duration']=agenda_duration((string)$g['duration']);$busy[]=$g;}
        foreach($busy as $g){$x=(new DateTimeImmutable($g['starts']))->getTimestamp();$y=$x+(int)$g['duration']*60;if($a<$y&&$b>$x)throw new ValidationError('El horario coincide con otra partida.');}
    }
    $reason=$status==='rejected'?txt($d['rejection_reason']??'',2000,true):'';
    if($status==='rejected' && $r['status']==='rejected' && trim((string)$r['rejection_reason'])!=='')$reason=$r['rejection_reason'];
    $newReject=$status==='rejected'&&($r['status']!=='rejected'||$reason!==$r['rejection_reason']);
    $emailStatus=$newReject?'pending':($status==='rejected'?$r['rejection_email_status']:'none');
    query('UPDATE game_requests SET status=?,paid=?,rejection_reason=?,rejection_email_status=? WHERE id=?',[$status,(int)(($d['paid']??false)===true),$reason,$emailStatus,$id]);db()->commit();
    if($newReject){
        try{$r['rejection_reason']=$reason;$r['request_type']='commissioned';$emailStatus=reservation_rejection_email($r,['title'=>$r['title'],'starts'=>$r['starts']]);query("UPDATE game_requests SET rejection_email_status=? WHERE id=? AND status='rejected' AND rejection_reason=?",[$emailStatus,$id,$reason]);}catch(Throwable $e){error_log('Solicitud: aviso pendiente de comprobar');}
    }
    $message='Solicitud guardada.'.($status==='confirmed'?' El horario queda ocupado.':'');
    if($newReject)$message.=' Mensaje guardado. Correo: '.['sent'=>'aceptado por SMTP','failed'=>'no se pudo confirmar el envío','not_configured'=>'sin configurar','no_recipient'=>'sin destinatario válido','pending'=>'pendiente de comprobar'][$emailStatus].'.';
    return ['ok'=>true,'message'=>$message];
}
