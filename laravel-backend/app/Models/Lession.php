<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lession extends Model
{
    use HasFactory;

    protected $fillable = ['idSubject', 'lession'];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'idSubject');
    }
}
