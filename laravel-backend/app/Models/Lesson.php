<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = ['idSubject', 'title', 'video_url', 'content'];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'idSubject');
    }
}
