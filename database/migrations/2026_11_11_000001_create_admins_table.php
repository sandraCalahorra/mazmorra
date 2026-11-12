<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('admins')) {
            Schema::create('admins', function (Blueprint $table): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->unsignedTinyInteger('id')->primary();
                $table->string('username', 80);
                $table->string('password_hash', 255);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
