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
            $table->text('bill');
            $table->string('price');
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
