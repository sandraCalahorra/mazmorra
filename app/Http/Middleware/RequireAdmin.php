<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class RequireAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        admin(true);
        return $next($request);
    }
}
