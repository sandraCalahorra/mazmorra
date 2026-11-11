<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\DeleteRequestController;
use App\Http\Controllers\SiteApiController;
use App\Http\Middleware\RequireAdmin;
use App\Http\Middleware\VerifyApiOrigin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    $sessionMiddleware = [
        Illuminate\Session\Middleware\StartSession::class,
        Illuminate\View\Middleware\ShareErrorsFromSession::class,
        Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
    ];

    Route::get('availability/next', [SiteApiController::class, 'availabilityNext'])->withoutMiddleware($sessionMiddleware);
    Route::get('availability', [SiteApiController::class, 'availability'])->withoutMiddleware($sessionMiddleware);
    Route::get('public', [SiteApiController::class, 'publicData'])->withoutMiddleware($sessionMiddleware);
    Route::get('admin/state', [SiteApiController::class, 'adminState'])->block(30, 30);

    Route::middleware(VerifyApiOrigin::class)->group(function (): void {
        Route::post('game-requests', [SiteApiController::class, 'submitGameRequest'])->block(30, 30);
        Route::post('login', [SiteApiController::class, 'login'])->block(30, 30);
        Route::post('reservations', [SiteApiController::class, 'reserve'])->block(30, 30);
        Route::post('shipping/quote', [SiteApiController::class, 'shippingQuote'])->block(30, 30);
        Route::post('account', AccountController::class)->block(30, 30);

        Route::middleware(RequireAdmin::class)->group(function (): void {
            Route::post('admin/game-request', [SiteApiController::class, 'adminGameRequest'])->block(30, 30);
            Route::post('admin/agenda', [SiteApiController::class, 'adminAgenda'])->block(30, 30);
            Route::post('admin/shipping', [SiteApiController::class, 'adminShipping'])->block(30, 30);
            Route::post('logout', [SiteApiController::class, 'logout'])->block(30, 30);
            Route::post('admin/commissioned-game', [SiteApiController::class, 'adminCommissionedGame'])->block(30, 30);
            Route::post('admin/commissioned-game/delete', [SiteApiController::class, 'adminCommissionedGameDelete'])->block(30, 30);
            Route::post('admin/product', [SiteApiController::class, 'adminProduct'])->block(30, 30);
            Route::post('admin/product/delete', [SiteApiController::class, 'adminProductDelete'])->block(30, 30);
            Route::post('admin/game', [SiteApiController::class, 'adminGame'])->block(30, 30);
            Route::post('admin/reservation/archive', [SiteApiController::class, 'adminReservationArchive'])->block(30, 30);
            Route::post('admin/reservation', [SiteApiController::class, 'adminReservation'])->block(30, 30);
            Route::post('admin/config', [SiteApiController::class, 'adminConfig'])->block(30, 30);
            Route::post('admin/upload', [SiteApiController::class, 'adminUpload'])->block(30, 30);
            Route::post('admin/request/delete', DeleteRequestController::class)->block(30, 30);
        });
    });

    Route::get('account', AccountController::class)->block(30, 30);
    Route::get('localities', function (Request $request) {
        $postcode = $request->query('postcode', '');
        if (!is_string($postcode) || !preg_match('/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/D', $postcode)) {
            return api_json(400, ['error' => 'Introduce un código postal español de cinco cifras.']);
        }

        return api_json(200, ['postcode' => $postcode, 'cities' => localidades_es($postcode)]);
    })->withoutMiddleware($sessionMiddleware);
});

Route::redirect('/recursos.html', '/catalogo.html');
Route::redirect('/recursos', '/catalogo');

foreach (config('pages') as $name => $page) {
    $paths = [$name.'.html', $name === 'index' ? '/' : $name];
    foreach ($paths as $path) {
        Route::view($path, 'site', compact('name', 'page'));
    }
}
