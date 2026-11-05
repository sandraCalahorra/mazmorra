<?php
declare(strict_types=1);
require_once __DIR__ . '/app/localidades.php';
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
try {
    $cp = $_GET['postcode'] ?? '';
    if (!is_string($cp) || !preg_match('/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/D', $cp)) {
        http_response_code(400);
        echo json_encode(['error'=>'Introduce un código postal español de cinco cifras.']);
        exit;
    }
    echo json_encode(['postcode'=>$cp,'cities'=>localidades_es($cp)], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
} catch (Throwable $e) {
    http_response_code(503);
    echo json_encode(['error'=>'No se pudo consultar la localidad.']);
}
