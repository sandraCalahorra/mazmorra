<?php

use App\Exceptions\ValidationError;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function (): void {
            // La API usa las mismas cookies, sesión y protección CSRF que la web.
            Route::middleware('web')->prefix('api')->group(base_path('routes/api.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $api = fn (Request $request) => $request->is('api/*');
        $middleware->trimStrings(except: [$api]);
        $middleware->convertEmptyStringsToNull(except: [$api]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(fn (Request $request) => $request->is('api/*') || $request->expectsJson());
        $exceptions->dontReport([ValidationError::class]);
        $exceptions->render(function (Throwable $error, Request $request) {
            if (!$request->is('api/*') || $error instanceof HttpExceptionInterface || $error instanceof HttpResponseException) {
                return null;
            }

            $connection = DB::connection()->getRawPdo();
            if ($connection instanceof PDO && $connection->inTransaction()) {
                $connection->rollBack();
            }

            if ($error instanceof ValidationError) {
                return api_json(400, ['error' => $error->getMessage()]);
            }

            return api_json(500, ['error' => 'No se pudo completar la operación. Revisa el registro de Laravel.']);
        });
    })
    ->create();
