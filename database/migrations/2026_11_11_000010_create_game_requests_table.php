<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('game_requests')) {
            Schema::create('game_requests', function (Blueprint $table): void {
                $table->engine('InnoDB');
                $table->charset('utf8mb4');
                $table->collation('utf8mb4_unicode_ci');

                $table->char('id', 32)->primary();
                $table->string('user_id', 80)->nullable();
                $table->string('name', 80);
                $table->string('contact', 200);
                $table->string('title', 200);
                $table->string('starts', 30);
                $table->integer('duration');
                $table->string('status', 20)->default('pending');
                $table->boolean('archived')->default(false);
                $table->unsignedTinyInteger('paid')->default(0);
                $table->text('rejection_reason')->nullable();
                $table->string('rejection_email_status', 24)->default('none');
                $table->longText('data');
                $table->timestamp('created')->useCurrent();
                $table->index('user_id', 'request_user');
                $table->index('status', 'request_status');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('game_requests');
    }
};
