<?php

declare(strict_types=1);
require __DIR__ . '/app/bootstrap.php';
require_once __DIR__ . '/app/shipping.php';
header('Content-Type: text/javascript; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
try {
    echo 'window.SITE_DATA=' . json_encode(shipping_public_data(), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_THROW_ON_ERROR) . ';';
} catch (Throwable $e) {
    http_response_code(503);
    echo 'window.SITE_DATA={products:[],games:[],config:{},error:"Base de datos no preparada. Sigue los pasos de LEEME.md."};';
    error_log('Mazmorra: error de conexión o esquema en site-data.');
}
