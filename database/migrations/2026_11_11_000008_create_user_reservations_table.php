<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('user_reservations')) {
            // MySQL exige que cada columna comparta la codificación y la colación de su referencia.
            $reservationCollation = collect(Schema::getColumns('reservations'))->firstWhere('name', 'id')['collation']
                ?? 'utf8mb4_unicode_ci';
            $userCollation = collect(Schema::getColumns('users'))->firstWhere('name', 'id')['collation']
                ?? 'utf8mb4_unicode_ci';

            Schema::create('user_reservations', function (Blueprint $table) use ($reservationCollation, $userCollation): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->string('reservation_id', 80)
                    ->charset(explode('_', $reservationCollation, 2)[0])
                    ->collation($reservationCollation)
                    ->primary();
                $table->char('user_id', 32)
                    ->charset(explode('_', $userCollation, 2)[0])
                    ->collation($userCollation);
            });
        }

        $foreignKeys = collect(Schema::getForeignKeys('user_reservations'));
        if (!$foreignKeys->contains(fn (array $key) => $key['columns'] === ['user_id']
            && $key['foreign_table'] === 'users' && $key['foreign_columns'] === ['id'])) {
            Schema::table('user_reservations', function (Blueprint $table): void {
                $table->foreign('user_id')->references('id')->on('users');
            });
        }

        if (!$foreignKeys->contains(fn (array $key) => $key['columns'] === ['reservation_id']
            && $key['foreign_table'] === 'reservations' && $key['foreign_columns'] === ['id'])) {
            Schema::table('user_reservations', function (Blueprint $table): void {
                $table->foreign('reservation_id')->references('id')->on('reservations')->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('user_reservations');
    }
};
