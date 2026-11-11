<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('agenda_settings')) {
            Schema::create('agenda_settings', function (Blueprint $table): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->unsignedTinyInteger('id')->primary();
                $table->longText('data');
            });
        }

        DB::table('agenda_settings')->insertOrIgnore([
            'id' => 1,
            'data' => json_encode([
                'enabled' => false,
                'step' => 15,
                'weekly' => array_fill(1, 7, []),
                'blocks' => [],
            ], JSON_THROW_ON_ERROR),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('agenda_settings');
    }
};
