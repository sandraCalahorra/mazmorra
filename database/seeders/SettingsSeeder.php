<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

final class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('settings')->insertOrIgnore([
            'id' => 1,
            'data' => json_encode([
                'whatsapp' => '',
                'paypal' => '',
                'email' => '',
                'delivery' => 'Entrega manual, en el plazo acordado con el autor.',
            ], JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE),
        ]);

        DB::table('agenda_settings')->insertOrIgnore([
            'id' => 1,
            'data' => json_encode(agenda_defaults(), JSON_THROW_ON_ERROR),
        ]);
    }
}
