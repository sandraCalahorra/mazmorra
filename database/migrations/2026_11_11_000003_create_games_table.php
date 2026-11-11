<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('games')) {
            Schema::create('games', function (Blueprint $table): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->string('id', 80)->primary();
                $table->string('title', 160);
                $table->string('starts', 30);
                $table->unsignedInteger('capacity');
                $table->string('price', 80);
                $table->string('mode', 100);
                $table->string('duration', 100);
                $table->text('description');
                $table->string('status', 20)->default('open');
                $table->index('starts', 'game_date');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
