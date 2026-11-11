<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('reservations')) {
            $gameCollation = collect(Schema::getColumns('games'))->firstWhere('name', 'id')['collation']
                ?? 'utf8mb4_unicode_ci';

            Schema::create('reservations', function (Blueprint $table) use ($gameCollation): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->string('id', 80)->primary();
                $table->string('game_id', 80)
                    ->charset(explode('_', $gameCollation, 2)[0])
                    ->collation($gameCollation);
                $table->string('name', 80);
                $table->string('contact', 200);
                $table->unsignedInteger('players');
                $table->text('notes');
                $table->string('status', 20)->default('pending');
                $table->unsignedTinyInteger('paid')->default(0);
                $table->string('created', 30);
                $table->index(['game_id', 'status'], 'reservation_status');
            });
        }

        $foreignKeys = collect(Schema::getForeignKeys('reservations'));
        if (!$foreignKeys->contains(fn (array $key) => $key['columns'] === ['game_id']
            && $key['foreign_table'] === 'games' && $key['foreign_columns'] === ['id'])) {
            Schema::table('reservations', function (Blueprint $table): void {
                $table->foreign('game_id', 'reservation_game')->references('id')->on('games');
            });
        }

        $existing = Schema::getColumnListing('reservations');
        Schema::table('reservations', function (Blueprint $table) use ($existing): void {
            if (!in_array('archived', $existing, true)) {
                $table->boolean('archived')->default(false);
            }
            if (!in_array('rejection_reason', $existing, true)) {
                $table->text('rejection_reason')->nullable();
            }
            if (!in_array('rejection_email_status', $existing, true)) {
                $table->string('rejection_email_status', 24)->default('none');
            }
            if (!in_array('rejection_notice_id', $existing, true)) {
                $table->string('rejection_notice_id', 32)->nullable();
            }
            if (!in_array('rejection_email_sent_at', $existing, true)) {
                $table->string('rejection_email_sent_at', 30)->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
