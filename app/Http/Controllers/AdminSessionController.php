<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\ValidationError;
use Illuminate\Http\JsonResponse;

final class AdminSessionController
{
    public function login(): JsonResponse
    {
        $d = body();
        rate_limit('login', 8, 900);
        $username = txt($d['username'] ?? '', 80);
        $password = $d['password'] ?? '';
        if (!is_string($password) || strlen($password) > 1024) throw new ValidationError('Contraseña no válida.');
        $user = query('SELECT * FROM admins WHERE id=1')->fetch();
        if (!$user) return api_json(503, ['error' => 'Crea el administrador con php artisan mazmorra:admin.']);
        if (!password_verify($password, $user['password_hash']) || !hash_equals($user['username'], $username)) return api_json(401, ['error' => 'Usuario o contraseña incorrectos.']);
        session()->migrate(true);
        session()->forget('user_id');
        session()->put(['admin' => 1, 'mazmorra_csrf' => bin2hex(random_bytes(32)), 'expires' => time() + 28800]);
        if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) query('UPDATE admins SET password_hash=? WHERE id=1', [password_hash($password, PASSWORD_DEFAULT)]);
        return api_json(200, ['ok' => true]);
    }

    public function logout(): JsonResponse
    {
        session()->invalidate();
        session()->regenerateToken();
        return api_json(200, ['ok' => true]);
    }
}
