<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['idUser', 'idSubject', 'payment_method', 'payment_status', 'price', 'quantity'];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'idSubject');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }
    /* public function subjectScheduled()
    {
        return $this->hasOneThrough(Schedule::class, Subject::class, 'id', 'idSubject', 'idSubject', 'id');
    } */
}
