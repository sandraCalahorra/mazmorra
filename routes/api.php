<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminSessionController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\DeleteRequestController;
use App\Http\Controllers\GameRequestController;
use App\Http\Controllers\LocalityController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ShippingController;
use App\Http\Middleware\RequireAdmin;
use App\Http\Middleware\VerifyApiOrigin;
use Illuminate\Support\Facades\Route;

$sessionMiddleware = [
    Illuminate\Session\Middleware\StartSession::class,
    Illuminate\View\Middleware\ShareErrorsFromSession::class,
    Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
];

Route::get('availability/next', [AgendaController::class, 'availabilityNext'])->withoutMiddleware($sessionMiddleware);
Route::get('availability', [AgendaController::class, 'availability'])->withoutMiddleware($sessionMiddleware);
Route::get('public', [CatalogController::class, 'publicData'])->withoutMiddleware($sessionMiddleware);
Route::get('admin/state', [AdminDashboardController::class, 'adminState'])->block(30, 30);

Route::middleware(VerifyApiOrigin::class)->group(function (): void {
    Route::post('game-requests', [GameRequestController::class, 'submitGameRequest'])->block(30, 30);
    Route::post('login', [AdminSessionController::class, 'login'])->block(30, 30);
    Route::post('reservations', [ReservationController::class, 'reserve'])->block(30, 30);
    Route::post('shipping/quote', [ShippingController::class, 'shippingQuote'])->block(30, 30);
    Route::post('account', AccountController::class)->block(30, 30);

    Route::middleware(RequireAdmin::class)->group(function (): void {
        Route::post('admin/game-request', [GameRequestController::class, 'adminGameRequest'])->block(30, 30);
        Route::post('admin/agenda', [AgendaController::class, 'adminAgenda'])->block(30, 30);
        Route::post('admin/shipping', [ShippingController::class, 'adminShipping'])->block(30, 30);
        Route::post('logout', [AdminSessionController::class, 'logout'])->block(30, 30);
        Route::post('admin/commissioned-game', [GameRequestController::class, 'adminCommissionedGame'])->block(30, 30);
        Route::post('admin/commissioned-game/delete', [GameRequestController::class, 'adminCommissionedGameDelete'])->block(30, 30);
        Route::post('admin/product', [CatalogController::class, 'adminProduct'])->block(30, 30);
        Route::post('admin/product/delete', [CatalogController::class, 'adminProductDelete'])->block(30, 30);
        Route::post('admin/game', [ReservationController::class, 'adminGame'])->block(30, 30);
        Route::post('admin/reservation/archive', [ReservationController::class, 'adminReservationArchive'])->block(30, 30);
        Route::post('admin/reservation', [ReservationController::class, 'adminReservation'])->block(30, 30);
        Route::post('admin/config', [AdminDashboardController::class, 'adminConfig'])->block(30, 30);
        Route::post('admin/upload', [AdminDashboardController::class, 'adminUpload'])->block(30, 30);
        Route::post('admin/request/delete', DeleteRequestController::class)->block(30, 30);
    });
});

Route::get('account', AccountController::class)->block(30, 30);
Route::get('localities', LocalityController::class)->withoutMiddleware($sessionMiddleware);
