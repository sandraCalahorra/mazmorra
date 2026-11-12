<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class VerifyApiOrigin
{
    public function handle(Request $request, Closure $next): Response
    {
        check_origin();
        return $next($request);
    }
}
