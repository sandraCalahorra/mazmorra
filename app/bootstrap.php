<?php

declare(strict_types=1);

class ValidationError extends RuntimeException {}
function db(): PDO
{
    return Illuminate\Support\Facades\DB::connection()->getPdo();
}
function query(string $sql, array $args = []): PDOStatement
{
    $stmt = db()->prepare($sql);
    $stmt->execute($args);
    return $stmt;
}
function json_response(int $status, array $data): never
{
    throw new Illuminate\Http\Exceptions\HttpResponseException(api_json($status, $data));
}
function api_json(int $status, array $data): Illuminate\Http\JsonResponse
{
    return response()->json($data, $status, [
        'Cache-Control' => 'no-store',
        'X-Content-Type-Options' => 'nosniff',
    ], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
}
function txt(mixed $value, int $limit = 300, bool $required = false): string
{
    if (!is_string($value) || !preg_match('//u', $value)) throw new ValidationError('Texto no válido.');
    $value = trim($value);
    if (preg_match_all('/./us', $value) > $limit || ($required && $value === '')) throw new ValidationError('Revisa los campos obligatorios y su longitud.');
    return $value;
}
function number(mixed $value, int $min, int $max): int
{
    if (!is_int($value) || $value < $min || $value > $max) throw new ValidationError("Introduce un entero entre $min y $max.");
    return $value;
}
function web_url(mixed $value, bool $upload = false): string
{
    $value = txt($value, 1000);
    if ($value === '') return '';
    if ($upload && preg_match('~^uploads/[a-f0-9]{32}\.(png|jpg|webp)$~D', $value)) return $value;
    $url = parse_url($value);
    if (!$url || ($url['scheme'] ?? '') !== 'https' || empty($url['host']) || isset($url['user']) || isset($url['pass']) || !filter_var($value, FILTER_VALIDATE_URL)) throw new ValidationError('Introduce una dirección HTTPS válida.');
    return $value;
}
function body(): array
{
    if (strtolower(explode(';', request()->header('Content-Type', ''))[0]) !== 'application/json') throw new ValidationError('Se requiere JSON.');
    $raw = request()->getContent();
    if (strlen($raw) > 4000000) throw new ValidationError('La solicitud es demasiado grande.');
    try {
        $object = json_decode($raw, false, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
        throw new ValidationError('JSON no válido.');
    }
    if (!$object instanceof stdClass) throw new ValidationError('Se requiere un objeto JSON.');
    return (array)$object;
}
function check_origin(): void
{
    $parts = parse_url(config('app.url'));
    $origin = ($parts['scheme'] ?? '') . '://' . ($parts['host'] ?? '')
        . (isset($parts['port']) ? ':' . $parts['port'] : '');
    if (request()->header('Origin') !== $origin || request()->getSchemeAndHttpHost() !== $origin) {
        json_response(403, ['error' => 'Origen no permitido. Abre la dirección configurada en APP_URL.']);
    }
}
function admin(bool $write = false): string
{
    if (!session('admin') || (session('expires', 0)) <= time()) json_response(401, ['error' => 'Inicia sesión para continuar.']);
    $csrf = session('mazmorra_csrf');
    if ($write && !hash_equals($csrf, request()->header('X-Mazmorra-CSRF', ''))) json_response(403, ['error' => 'Sesión inválida. Vuelve a iniciar sesión.']);
    return $csrf;
}
function rate_limit(string $key, int $limit, int $window): void
{
    $key = hash('sha256', (request()->ip() ?? 'unknown') . '|' . $key);
    $now = time();
    $c = db();
    $c->beginTransaction();
    query('INSERT IGNORE INTO rate_limits(bucket,hits,expires) VALUES(?,0,?)', [$key, $now + $window]);
    $r = query('SELECT * FROM rate_limits WHERE bucket=? FOR UPDATE', [$key])->fetch();
    if ((int)$r['expires'] <= $now) {
        query('UPDATE rate_limits SET hits=1,expires=? WHERE bucket=?', [$now + $window, $key]);
    } else {
        if ((int)$r['hits'] >= $limit) {
            $c->commit();
            json_response(429, ['error' => 'Demasiados intentos. Espera un poco antes de volver a intentarlo.']);
        }
        query('UPDATE rate_limits SET hits=hits+1 WHERE bucket=?', [$key]);
    }
    $c->commit();
    query('DELETE FROM rate_limits WHERE expires<?', [$now - 3600]);
}
function products(bool $public = false): array
{
    $items = array_map(fn($r) => json_decode($r['data'], true, 512, JSON_THROW_ON_ERROR), query('SELECT data FROM products ORDER BY created,id')->fetchAll());
    return $public ? array_values(array_filter($items, fn($p) => ($p['published'] ?? true) === true)) : $items;
}
function games(): array
{
    $items = query("SELECT g.*, (SELECT COALESCE(SUM(r.players),0) FROM reservations r WHERE r.game_id=g.id AND r.status='confirmed') AS booked FROM games g ORDER BY starts")->fetchAll();
    foreach ($items as &$g) {
        $g['capacity'] = (int)$g['capacity'];
        $g['booked'] = (int)$g['booked'];
        $g['available'] = max(0, $g['capacity'] - $g['booked']);
    }
    unset($g);
    return $items;
}
function settings(): array
{
    $c = json_decode(query('SELECT data FROM settings WHERE id=1')->fetchColumn(), true, 512, JSON_THROW_ON_ERROR);
    if (!array_key_exists('previews', $c)) $c['previews'] = [['title' => 'Muestra de aventura', 'url' => 'https://heyzine.com/flip-book/5ce3063b40.html']];
    return $c;
}

function commissioned_games(bool $public = false): array
{
    $rows = query(
        'SELECT data FROM commissioned_games ORDER BY created,id'
    )->fetchAll();

    $items = array_map(
        fn($row) => json_decode(
            $row['data'],
            true,
            512,
            JSON_THROW_ON_ERROR
        ),
        $rows
    );

    return $public
        ? array_values(array_filter(
            $items,
            fn($item) => ($item['published'] ?? false) === true
        ))
        : $items;
}
function public_data(): array {
    return [
        'products' => products(true),
        'commissioned_games' => commissioned_games(true),
        'games' => array_values(array_filter(
            games(),
            fn($game) => $game['status'] === 'open'
        )),
        'config' => settings(),
    ];
}
function date_value(mixed $v): string
{
    $v = txt($v, 40, true);
    if (!preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})$/D', $v)) throw new ValidationError('Fecha no válida.');
    try {
        $date = new DateTimeImmutable($v);
        $errors = DateTimeImmutable::getLastErrors();
        if ($errors && ($errors['warning_count'] || $errors['error_count'])) throw new Exception();
    } catch (Exception $e) {
        throw new ValidationError('Fecha no válida.');
    }
    return $date->setTimezone(new DateTimeZone('UTC'))->format('Y-m-d\TH:i:s\Z');
}
function reserved(string $id, string $exclude = ''): int
{
    return (int)query("SELECT COALESCE(SUM(players),0) FROM reservations WHERE game_id=? AND status='confirmed' AND id<>?", [$id, $exclude])->fetchColumn();
}
