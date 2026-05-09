<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        Log::info('Admin API request', [
            'method' => $request->method(),
            'path' => $request->path(),
            'user' => $request->user()?->email,
            'ip' => $request->ip(),
        ]);

        return $next($request);
    }
}
