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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            //$table->unsignedBigInteger('idTeacher')->foreignId('idTeacher')->constrained('users')->onDelete('cascade');
            $table->string('teacher');
            //$table->unsignedBigInteger('idSubject')->foreignId('idSubject')->constrained('subjects');
            $table->string('subject');
            $table->string('grade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
