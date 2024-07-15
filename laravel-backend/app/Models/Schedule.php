<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = ['idSubject', 'idTeacher', 'startTime', 'endTime', 'schedule', 'available_seats'];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'idSubject');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'idTeacher');
    }
}
