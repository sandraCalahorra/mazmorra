<?php

use Illuminate\Support\Facades\Route;

foreach (['/recursos.html', '/recursos'] as $legacyPath) {
    Route::get($legacyPath, fn () => redirect()->route('pages.catalogo', request()->query(), 301));
}

foreach (config('pages') as $name => $page) {
    $path = $name === 'index' ? '/' : '/'.$name;
    $route = 'pages.'.$name;

    Route::view($path, 'site', compact('name', 'page'))->name($route);
    Route::get('/'.$name.'.html', fn () => redirect()->route($route, request()->query(), 301));
}
