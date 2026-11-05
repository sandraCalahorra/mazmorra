<?php
declare(strict_types=1);

// Fuente: GeoNames, CC BY 4.0. Coincidencia con el catálogo, no validación de domicilio.
function localidades_es(string $postcode): array {
    if (!preg_match('/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/D', $postcode)) return [];
    static $data = null;
    if ($data === null) {
        $raw = file_get_contents(__DIR__ . '/localidades-es.json');
        if ($raw === false) throw new RuntimeException('No se pudo cargar el catálogo postal.');
        $data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
    }
    return $data[$postcode] ?? [];
}
