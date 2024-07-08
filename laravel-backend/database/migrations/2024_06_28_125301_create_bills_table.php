<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->json('items');
            $table->string('email');
            $table->string('status');
            $table->string('subject');
            $table->text('bill');
            $table->decimal('price', 8, 2);
            $table->timestamps();
            // $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            // $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
