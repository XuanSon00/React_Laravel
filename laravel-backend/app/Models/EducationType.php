<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationType extends Model
{
    use HasFactory;

    protected $fillable = ['type'];

    public function subjects()
    {
        return $this->hasMany(Subject::class, 'idEducationType');
    }
}
