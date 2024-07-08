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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('idUser');
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade'); // khóa ngoại 
            $table->unsignedBigInteger('idSubject');
            $table->foreign('idSubject')->references('id')->on('subjects')->onDelete('cascade'); // khóa ngoại 
            $table->unsignedBigInteger('idSchedule');
            $table->foreign('idSchedule')->references('id')->on('schedules')->onDelete('cascade'); // khóa ngoại 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
