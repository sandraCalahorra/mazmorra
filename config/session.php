<?php

return [
    'driver' => env('SESSION_DRIVER', 'file'),
    'lifetime' => 480,
    'cookie' => 'mazmorra_session',
    'secure' => env('SESSION_SECURE_COOKIE', str_starts_with(env('APP_URL', ''), 'https://')),
    'http_only' => true,
    'same_site' => 'strict',
];
