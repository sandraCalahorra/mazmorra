<?php

declare(strict_types=1);
require __DIR__ . '/app/bootstrap.php';
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
$host = parse_url($config['origin'], PHP_URL_HOST);
$port = parse_url($config['origin'], PHP_URL_PORT);
$authority = $host . ($port ? ':' . $port : '');
if (empty($config['allow_local_setup']) || !in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true) || !in_array($host, ['localhost', '127.0.0.1', '::1'], true) || ($_SERVER['HTTP_HOST'] ?? '') !== $authority) {
    http_response_code(403);
    exit('Instalación disponible únicamente desde el propio equipo, usando el origen local configurado.');
}
$error = '';
$done = false;
$installed = false;
$ready = false;
try {
    $installed = (bool)query('SELECT id FROM admins WHERE id=1')->fetch();
    if ($installed) {
        http_response_code(409);
    } else {
        start_session();
        $_SESSION['setup_csrf'] ??= bin2hex(random_bytes(32));
        $ready = true;
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            check_origin();
            if (!is_string($_POST['csrf'] ?? null) || !hash_equals($_SESSION['setup_csrf'], $_POST['csrf'])) throw new ValidationError('Recarga la página e inténtalo de nuevo.');
            $username = txt($_POST['username'] ?? '', 80, true);
            $password = $_POST['password'] ?? '';
            if (!is_string($password) || strlen($password) < 12 || strlen($password) > 72 || $password !== ($_POST['repeat'] ?? null)) throw new ValidationError('Las contraseñas deben coincidir y tener entre 12 y 72 bytes.');
            db()->beginTransaction();
            query('SELECT id FROM settings WHERE id=1 FOR UPDATE')->fetch();
            if (query('SELECT id FROM admins WHERE id=1')->fetch()) throw new ValidationError('Ya existe un administrador.');
            query('INSERT INTO admins(id,username,password_hash) VALUES(1,?,?)', [$username, password_hash($password, PASSWORD_DEFAULT)]);
            if ((int)query('SELECT COUNT(*) FROM products')->fetchColumn() === 0) {
                $seed = json_decode(file_get_contents(__DIR__ . '/app/seed-products.json'), true, 512, JSON_THROW_ON_ERROR);
                foreach ($seed as $p) query('INSERT INTO products(id,data) VALUES(?,?)', [$p['id'], json_encode($p, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)]);
            }
            db()->commit();
            unset($_SESSION['setup_csrf']);
            $done = true;
        }
    }
} catch (ValidationError $e) {
    if (db()->inTransaction()) db()->rollBack();
    $error = $e->getMessage();
} catch (Throwable $e) {
    try {
        if (db()->inTransaction()) db()->rollBack();
    } catch (Throwable $ignored) {
    }
    $ready = false;
    $error = 'No se pudo preparar la instalación. Inicia MySQL, importa database/schema.sql en phpMyAdmin y revisa app/config.php.';
}
function html(string $v): string
{
    return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
?>
<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Instalación — La Mazmorra del Roleo</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/admin.css">
</head>

<body>
    <main class="admin-shell">
        <section id="login">
            <p class="eyebrow">LA MAZMORRA DEL ROLEO · XAMPP</p>
            <h1>Prepara tu mesa.</h1>
            <?php if ($error): ?><p class="admin-error" role="alert"><?= html($error) ?></p><?php endif; ?>
            <?php if ($installed || $done): ?><h2><?= $done ? 'Administrador creado.' : 'La instalación ya está completada.' ?></h2>
                <p>El instalador queda bloqueado al existir un administrador. Cambia también <code>allow_local_setup</code> a <code>false</code> en <code>app/config.php</code>.</p><a class="btn gold" href="admin.html">Abrir administrador ↗</a>
            <?php elseif ($ready): ?><p>Crea tu acceso privado. No hay usuario ni contraseña predeterminados.</p>
                <form method="post" action="instalar.php"><input type="hidden" name="csrf" value="<?= html($_SESSION['setup_csrf']) ?>"><label>Usuario<input name="username" maxlength="80" required autocomplete="username"></label><label>Contraseña (mínimo 12 caracteres)<input name="password" type="password" minlength="12" maxlength="72" required autocomplete="new-password"></label><label>Repite la contraseña<input name="repeat" type="password" minlength="12" maxlength="72" required autocomplete="new-password"></label><button class="btn gold" type="submit">Crear administrador</button></form>
            <?php else: ?><p>Sigue las instrucciones de <strong>LEEME.md</strong> y recarga esta página.</p><?php endif; ?>
        </section>
    </main>
</body>

</html>