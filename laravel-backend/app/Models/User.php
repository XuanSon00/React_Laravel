<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'status', 'role', 'idRole',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'idRole');
    }

    public function schedulesAsTeacher()
    {
        return $this->hasMany(Schedule::class, 'idTeacher', 'id');
    }

    // sau khi cập nhật role là 'Teacher'
    protected static function boot()
    {
        parent::boot();

        static::updated(function ($user) {
            if ($user->role === 'Teacher') {
                $user->schedulesAsTeacher->each(function ($schedule) use ($user) {
                    $schedule->update([
                        'idTeacher' => $user->id,
                    ]);
                });
            }
        });
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'idUser');
    }

    public $timestamps = true;

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
