<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('settings')) {
            Schema::create('settings', function (Blueprint $table): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->unsignedTinyInteger('id')->primary();
                $table->longText('data');
            });
        }

        DB::table('settings')->insertOrIgnore([
            'id' => 1,
            'data' => json_encode([
                'whatsapp' => '',
                'paypal' => '',
                'email' => '',
                'delivery' => 'Entrega manual, en el plazo acordado con el autor.',
            ], JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
