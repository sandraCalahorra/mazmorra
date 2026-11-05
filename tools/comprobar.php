<?php

declare(strict_types=1);
if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('Solo disponible desde la terminal.');
}
require dirname(__DIR__) . '/app/bootstrap.php';
function ok(bool $value, string $label): void
{
    if (!$value) throw new RuntimeException($label);
    echo "OK: $label\n";
}
try {
    ok(version_compare(PHP_VERSION, '8.2', '>='), 'PHP 8.2 o superior');
    ok(extension_loaded('pdo_mysql'), 'Extensión pdo_mysql');
    ok(extension_loaded('gd'), 'Extensión GD para portadas');
    ok(is_writable(dirname(__DIR__) . '/uploads'), 'Carpeta uploads escribible');
    $c = db();
    ok(true, 'Conexión MySQL/MariaDB');
    foreach (['admins', 'products', 'games', 'reservations', 'settings', 'rate_limits'] as $table) {
        $engine = query('SELECT ENGINE FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=?', [$table])->fetchColumn();
        ok($engine === 'InnoDB', "Tabla $table con motor InnoDB");
    }
    ok((bool)query('SELECT id FROM settings WHERE id=1')->fetch(), 'Configuración inicial');
    ok((bool)query('SELECT id FROM admins WHERE id=1')->fetch(), 'Administrador creado');
    ok(date_value('2027-01-02T18:00:00+01:00') === '2027-01-02T17:00:00Z', 'Conversión de fecha UTC');
    $id = bin2hex(random_bytes(8));
    $rid = bin2hex(random_bytes(8));
    $c->beginTransaction();
    query('INSERT INTO games(id,title,starts,capacity,price,mode,duration,description,status) VALUES(?,?,?,?,?,?,?,?,?)', [$id, 'Prueba temporal', '2099-01-01T18:00:00Z', 2, '', 'Online', '', '', 'open']);
    $game = query('SELECT * FROM games WHERE id=? FOR UPDATE', [$id])->fetch();
    ok((int)$game['capacity'] === 2, 'Bloqueo de fila dentro de transacción');
    query('INSERT INTO reservations(id,game_id,name,contact,players,notes,status,created) VALUES(?,?,?,?,?,?,?,?)', [$rid, $id, 'Prueba', 'prueba@example.invalid', 2, '', 'confirmed', gmdate('Y-m-d\TH:i:s\Z')]);
    ok(reserved($id) === 2, 'Recuento de plazas confirmadas');
    query("UPDATE reservations SET status='cancelled' WHERE id=?", [$rid]);
    ok(reserved($id) === 0, 'Liberación de plazas canceladas');
    $c->rollBack();
    ok(!query('SELECT id FROM games WHERE id=?', [$id])->fetch(), 'Pruebas revertidas sin conservar registros');
    echo "\nComprobación terminada. Prueba también los formularios y el calendario en el navegador.\n";
} catch (Throwable $e) {
    try {
        if (db()->inTransaction()) db()->rollBack();
    } catch (Throwable $ignored) {
    }
    fwrite(STDERR, "ERROR: " . $e->getMessage() . "\n");
    exit(1);
}
