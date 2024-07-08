<?php

namespace App\Providers;

use App\Models\Role;
use App\Observers\RoleObserver;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    /* public function boot()
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    } */

    public function boot()
    {
        Role::observe(RoleObserver::class);
    }
}
