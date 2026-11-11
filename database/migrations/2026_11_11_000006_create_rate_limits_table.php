<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('rate_limits')) {
            Schema::create('rate_limits', function (Blueprint $table): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->char('bucket', 64)->primary();
                $table->unsignedInteger('hits');
                $table->unsignedBigInteger('expires');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('rate_limits');
    }
};
