<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRoleMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && $request->user()->role !== 'Admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return $next($request);
    }
}
