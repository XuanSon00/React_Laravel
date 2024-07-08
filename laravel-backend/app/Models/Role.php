<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Role extends Model
{
    protected $fillable = ['name', 'status'];

    public function users()
    {
        return $this->hasMany(User::class, 'idRole'); // Liên kết với bảng users thông qua idRole
    }


    protected static function boot()
    {
        parent::boot();

        static::updated(function ($role) {
            $users = $role->users;

            // Cập nhật status của users
            foreach ($users as $user) {
                $user->status = $role->status;
                $user->save();
            }
        });
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'idSubject');
    }
}
