<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;
    protected $fillable = ['idUser', 'idSubject', 'idSchedule',];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'idSubject');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'idSchedule');
    }
}
