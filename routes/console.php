<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('mazmorra:admin', function (): int {
    if (query('SELECT id FROM admins WHERE id=1')->fetch()) {
        $this->error('Ya existe un administrador.');
        return 1;
    }

    try {
        $username = txt($this->ask('Usuario'), 80, true);
        $password = $this->secret('Contraseña');
        if (!is_string($password) || strlen($password) < 12 || strlen($password) > 72
            || $password !== $this->secret('Repite la contraseña')) {
            throw new ValidationError('Las contraseñas deben coincidir y tener entre 12 y 72 bytes.');
        }

        $connection = db();
        $connection->beginTransaction();
        query('SELECT id FROM settings WHERE id=1 FOR UPDATE')->fetch();
        if (query('SELECT id FROM admins WHERE id=1')->fetch()) {
            throw new ValidationError('Ya existe un administrador.');
        }
        query('INSERT INTO admins(id,username,password_hash) VALUES(1,?,?)', [
            $username, password_hash($password, PASSWORD_DEFAULT),
        ]);
        if ((int) query('SELECT COUNT(*) FROM products')->fetchColumn() === 0) {
            $products = json_decode(file_get_contents(app_path('seed-products.json')), true, 512, JSON_THROW_ON_ERROR);
            foreach ($products as $product) {
                query('INSERT INTO products(id,data) VALUES(?,?)', [
                    $product['id'], json_encode($product, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
                ]);
            }
        }
        $connection->commit();
    } catch (Throwable $error) {
        if (isset($connection) && $connection->inTransaction()) {
            $connection->rollBack();
        }
        throw $error;
    }

    $this->info('Administrador creado.');
    return 0;
})->purpose('Crear la cuenta inicial de administración');
