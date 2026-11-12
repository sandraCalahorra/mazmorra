<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->char('id', 32)->primary();
                $table->string('name', 80);
                $table->string('email', 200)->unique();
                $table->string('contact', 200);
                $table->string('password_hash', 255);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
