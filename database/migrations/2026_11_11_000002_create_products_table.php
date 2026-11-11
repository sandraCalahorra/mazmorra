<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->string('id', 80)->primary();
                $table->longText('data');
                $table->timestamp('created')->useCurrent();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
