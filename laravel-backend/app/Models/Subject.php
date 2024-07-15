<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = ['name', 'active', 'grade', 'price', 'image', 'max_students', 'idEducationType'];

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'idSubject');
    }

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($subject) {
            $subject->schedules()->each(function ($schedule) use ($subject) {
                $schedule->subject = $subject->name;
                $schedule->save();
            });
        });
    }

    public function educationType()
    {
        return $this->belongsTo(EducationType::class, 'idEducationType');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'idSubject');
    }
}
