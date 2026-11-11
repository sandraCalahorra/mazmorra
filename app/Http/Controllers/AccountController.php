<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Throwable;
use ValidationError;
use PDOException;

final class AccountController
{
    public function __invoke(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        try {
            if ((session('expires', 0)) <= time()) session()->forget(['user_id', 'admin', 'mazmorra_csrf', 'expires']);
            if (!session('mazmorra_csrf')) {
                session()->put('mazmorra_csrf', bin2hex(random_bytes(32)));
                session()->put('expires', time() + 28800);
            }
            $csrf = session('mazmorra_csrf');
            $uid = session('user_id');
            $isAdmin = (bool)session('admin');
            $u = $uid ? query('SELECT id,name,email,contact FROM users WHERE id=?', [$uid])->fetch() : null;
            if ($request->isMethodSafe()) {
                $reservations = $u ? query(
                    'SELECT r.id,r.name,r.players,r.status,r.paid,r.rejection_reason,
                            g.title,g.starts,g.duration,g.mode
                     FROM user_reservations ur
                     JOIN reservations r ON r.id=ur.reservation_id
                     JOIN games g ON g.id=r.game_id
                     WHERE ur.user_id=? ORDER BY g.starts DESC', [$uid]
                )->fetchAll() : [];
                if($u)$reservations=array_merge($reservations,game_request_rows((string)$uid));
                json_response(200, ['user'=>$u ?: null,'admin'=>$isAdmin,'csrf'=>$csrf,'reservations'=>$reservations]);
            }
            if (!hash_equals($csrf, $request->header('X-Mazmorra-CSRF', ''))) json_response(403, ['error'=>'Recarga la página y vuelve a intentarlo.']);
            $d = body();
            $action = $d['action'] ?? '';
            if ($action === 'register' || $action === 'login') {
                rate_limit('user-' . $action, $action === 'login' ? 10 : 5, 900);
                $email = strtolower(txt($d['email'] ?? '', 200, true));
                if (!filter_var($email,FILTER_VALIDATE_EMAIL)) throw new ValidationError('Introduce un correo válido.');
                $pass = $this->passwordValue($d['password'] ?? '');
                if ($action === 'register') {
                    if (($d['consent'] ?? false) !== true) throw new ValidationError('Acepta el uso de tus datos para crear la cuenta.');
                    $id = bin2hex(random_bytes(16));
                    $name = txt($d['name'] ?? '',80,true);
                    $contact = txt($d['contact'] ?? '',200,true);
                    try {
                        query('INSERT INTO users (id,name,email,contact,password_hash) VALUES(?,?,?,?,?)',[$id,$name,$email,$contact,password_hash($pass,PASSWORD_DEFAULT)]);
                    } catch (PDOException $e) {
                        if ($e->getCode() === '23000') throw new ValidationError('No se pudo crear la cuenta con ese correo. Prueba a iniciar sesión.');
                        throw $e;
                    }
                } else {
                    $row = query('SELECT * FROM users WHERE email=?',[$email])->fetch();
                    $hash = $row ? $row['password_hash'] : '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi';
                    if (!password_verify($pass,$hash) || !$row) json_response(401,['error'=>'Correo o contraseña incorrectos.']);
                    $id = $row['id'];
                }
                session()->migrate(true);
                session()->put('user_id', $id);
                session()->put('expires', time()+28800);
                session()->put('mazmorra_csrf', bin2hex(random_bytes(32)));
            } elseif ($action === 'logout') {
                session()->invalidate();
                session()->regenerateToken();
            } elseif ($action === 'profile') {
                if (!$u) json_response(401,['error'=>'Inicia sesión.']);
                $name=txt($d['name'] ?? '',80,true);
                $contact=txt($d['contact'] ?? '',200,true);
                if (($d['password'] ?? '') !== '') {
                    $row=query('SELECT password_hash FROM users WHERE id=?',[$uid])->fetch();
                    rate_limit('password-change',8,900);
                    if (!is_string($d['current'] ?? null) || !password_verify($d['current'],$row['password_hash'])) throw new ValidationError('La contraseña actual no es correcta.');
                    $pass=$this->passwordValue($d['password']);
                    query('UPDATE users SET name=?,contact=?,password_hash=? WHERE id=?',[$name,$contact,password_hash($pass,PASSWORD_DEFAULT),$uid]);
                    session()->migrate(true);
                } else query('UPDATE users SET name=?,contact=? WHERE id=?',[$name,$contact,$uid]);
            } else throw new ValidationError('Acción no válida.');
            json_response(200,['ok'=>true]);
        } catch (ValidationError $e) {
            json_response(400,['error'=>$e->getMessage()]);
        } catch (HttpResponseException $e) {
            return $e->getResponse();
        } catch (Throwable $e) {
            error_log('Usuario API: ' . get_class($e));
            json_response(500,['error'=>'No se pudo completar la operación. Comprueba MySQL y las migraciones de database/usuarios.sql y database/avisos-reservas.sql.']);
        }
    }

    private function passwordValue(mixed $p): string {
        if (!is_string($p) || strlen($p) < 12 || strlen($p) > 72) throw new ValidationError('La contraseña debe tener entre 12 y 72 bytes.');
        return $p;
    }
}
