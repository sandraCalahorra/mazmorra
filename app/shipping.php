<?php

declare(strict_types=1);

// Correos Paq Estándar a domicilio. Un ejemplar físico por consulta.
// El precio del paquete se obtiene siempre de products, nunca del navegador.
function shipping_array(mixed $value): array
{
    if ($value instanceof stdClass) return (array)$value;
    return is_array($value) ? $value : [];
}
function shipping_number(mixed $value, float $min, float $max, string $label, bool $optional = false): ?float
{
    if ($optional && ($value === '' || $value === null)) return null;
    if ((!is_string($value) && !is_int($value) && !is_float($value)) || !is_numeric(str_replace(',', '.', (string)$value))) throw new ValidationError($label . ': introduce un número válido.');
    $n = (float)str_replace(',', '.', (string)$value);
    if (!is_finite($n) || $n < $min || $n > $max) throw new ValidationError($label . ': valor fuera de rango.');
    return round($n, 2);
}
function shipping_raw_settings(): array
{
    $row = query('SELECT data FROM settings WHERE id=1')->fetch();
    return $row ? shipping_array(json_decode($row['data'], true, 512, JSON_THROW_ON_ERROR)) : [];
}
function shipping_defaults(array $saved = []): array
{
    $defaults = [
        'enabled' => false,
        'confirmed' => false,
        'origin_postcode' => '',
        'valid_until' => '',
        'packaging_fee' => 2,
        'packaging_types' => [],
        'surcharge_percent' => 0,
        'rates' => [
            '1' => [3.86, 4.08, 4.35, 4.59, 4.73, 6.20, 7.94],
            '2' => [4.06, 4.26, 4.54, 4.74, 4.88, 6.24, 8.05],
            '3' => [4.40, 4.63, 5.02, 5.37, 5.56, 6.99, 8.93],
            '3+' => [4.40, 4.81, 5.24, 5.64, 5.86, 7.39, 9.52],
            '4' => [5.69, 6.52, 7.83, 8.47, 9.14, 12.41, 16.20],
        ],
        'tax_percent' => ['1' => null, '2' => null, '3' => null, '3+' => null, '4' => null],
        // Las zonas de provincias restantes deben confirmarse con Correos.
        'province_zones' => ['50' => '1', '07' => '4'],
    ];
    return array_replace($defaults, $saved);
}
function shipping_validate_config(array $d): array
{
    $c = shipping_defaults();
    $c['enabled'] = ($d['enabled'] ?? false) === true;
    $c['confirmed'] = ($d['confirmed'] ?? false) === true;
    $cp = $d['origin_postcode'] ?? '';
    if (!is_string($cp) || ($cp !== '' && !preg_match('/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/D', $cp))) throw new ValidationError('Código postal de origen no válido.');
    $c['origin_postcode'] = $cp;
    $date = $d['valid_until'] ?? '';
    if (!is_string($date)) throw new ValidationError('Fecha no válida.');
    if ($date !== '') {
        $dt = DateTimeImmutable::createFromFormat('!Y-m-d', $date);
        if (!$dt || $dt->format('Y-m-d') !== $date) throw new ValidationError('Fecha de revisión no válida.');
    }
    $c['valid_until'] = $date;
    $c['packaging_fee'] = shipping_number($d['packaging_fee'] ?? 0, 0, 100, 'Embalaje');
    $c['surcharge_percent'] = shipping_number($d['surcharge_percent'] ?? 0, 0, 100, 'Recargo');
    $rates = shipping_array($d['rates'] ?? []);
    $taxes = shipping_array($d['tax_percent'] ?? []);
    foreach (['1', '2', '3', '3+', '4'] as $zone) {
        $row = $rates[$zone] ?? null;
        if (!is_array($row) || count($row) !== 7) throw new ValidationError('Completa los siete tramos de la zona ' . $zone . '.');
        $c['rates'][$zone] = array_map(fn($v) => shipping_number($v, 0.01, 1000, 'Tarifa zona ' . $zone), array_values($row));
        $c['tax_percent'][$zone] = shipping_number($taxes[$zone] ?? null, 0, 100, 'Impuesto zona ' . $zone, true);
    }
    $zones = shipping_array($d['province_zones'] ?? []);
    $c['province_zones'] = [];
    for ($i = 1; $i <= 52; $i++) {
        $key = str_pad((string)$i, 2, '0', STR_PAD_LEFT);
        $zone = $zones[$key] ?? '';
        if (!is_string($zone) || !in_array($zone, ['', '1', '2', '3', '3+', '4'], true)) throw new ValidationError('Zona no válida para provincia ' . $key . '.');
        if ($zone !== '') $c['province_zones'][$key] = $zone;
    }
    $today = (new DateTimeImmutable('now', new DateTimeZone('Europe/Madrid')))->format('Y-m-d');
    if ($c['enabled'] && (!$c['confirmed'] || $cp === '' || $date < $today)) throw new ValidationError('Para activar, confirma el contrato, indica el origen y una fecha de revisión vigente.');
    $types = shipping_array($d['packaging_types'] ?? []);
    $c['packaging_types'] = [];
    foreach (['envelope' => 5] as $kind => $limit) {
        $t = shipping_array($types[$kind] ?? []);
        $t['max_weight_kg'] = 5;
        $clean = ['enabled' => ($t['enabled'] ?? false) === true];
        foreach (
            [
                'fee' => [0, 100],
                'weight_g' => [0, 10000],
                'inner_length_cm' => [0.01, 240],
                'inner_width_cm' => [0.01, 240],
                'inner_height_cm' => [0.01, 240],
                'length_cm' => [0.01, 240],
                'width_cm' => [0.01, 240],
                'height_cm' => [0.01, 240],
                'max_weight_kg' => [5, 5]
            ] as $key => $range
        ) {
            $clean[$key] = shipping_number($t[$key] ?? null, $range[0], $range[1], 'Embalaje ' . $kind . ': ' . $key, true);
            if ($clean['enabled'] && $clean[$key] === null) throw new ValidationError('Completa todos los datos del embalaje ' . $kind . '.');
        }
        if ($clean['enabled'] && ($clean['inner_length_cm'] > $clean['length_cm']
            || $clean['inner_width_cm'] > $clean['width_cm'] || $clean['inner_height_cm'] > $clean['height_cm'])) {
            throw new ValidationError('Las medidas interiores no pueden superar las exteriores.');
        }
        $c['packaging_types'][$kind] = $clean;
    }
    return $c;
}
function shipping_product_data(array $d): array
{
    $s = [];
    foreach (['book_weight_g' => [0.01, 40000], 'book_length_cm' => [0.01, 240], 'book_width_cm' => [0.01, 240], 'book_height_cm' => [0.01, 240]] as $key => $limits) {
        $s[$key] = shipping_number($d['shipping_' . $key] ?? null, $limits[0], $limits[1], 'Datos del libro sin embalaje: ' . $key, true);
    }
    return $s;
}
function shipping_quote_parcel(
    array $p,
    string $packageId,
    string $postcode,
    string $country,
    array $c,
    bool $validateOnly = false
): array {
    $labels = [
        'book' => 'Libro físico',
        'book_pdf' => 'Libro + PDF',
        'book_pdf_vtt' => 'Libro + PDF + VTT',
        'book_pdf_vtt_json' => 'Libro + PDF + VTT + JSON',
    ];

    $package = null;

    foreach (($p['purchase_packages'] ?? []) as $entry) {
        $entry = shipping_array($entry);

        if (($entry['id'] ?? '') === $packageId) {
            $package = $entry;
            break;
        }
    }

    if (
        !isset($labels[$packageId]) ||
        !$package ||
        !in_array($p['sale_format'] ?? '', ['physical', 'both'], true)
    ) {
        throw new ValidationError('Selecciona un paquete físico disponible.');
    }

    $price = shipping_number(
        $package['price'] ?? null,
        0.01,
        10000,
        'Precio del producto'
    );

    $postcode = trim($postcode);

    $result = [
        'available' => false,
        'title' => $p['title'] ?? 'Publicación',
        'package_label' => $labels[$packageId],
        'product_price' => $price,
        'country' => $country,
        'postcode' => $postcode,
        'message' => 'Envío a consultar. Te confirmaré el importe total antes del pago.',
    ];

    // Devuelve el motivo sin modificar el precio del producto.
    $unavailable = static function (string $message) use ($result): array {
        return array_merge($result, ['message' => $message]);
    };

    if (($p['published'] ?? true) === false) {
        throw new ValidationError('Publicación no disponible.');
    }

    if (!in_array($p['status'] ?? '', ['Disponible', 'Publicado'], true)) {
        return $unavailable(
            'Esta publicación no está disponible para compra.'
        );
    }

    if (($p['physical_stock'] ?? '') !== 'available') {
        return $unavailable(
            'El stock físico de esta publicación no está marcado como disponible.'
        );
    }

    if ($country !== 'ES') {
        return $unavailable(
            'Los envíos internacionales se consultan por WhatsApp.'
        );
    }

    if (!preg_match(
        '/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/D',
        $postcode
    )) {
        throw new ValidationError(
            'Introduce un código postal español de cinco cifras.'
        );
    }

    // Por ejemplo: 50004 → provincia 50 (Zaragoza).
    $province = substr($postcode, 0, 2);

    if (in_array($province, ['35', '38', '51', '52'], true)) {
        return $unavailable(
            'Los envíos a Canarias, Ceuta y Melilla se confirman por WhatsApp.'
        );
    }

    if (($c['enabled'] ?? false) !== true) {
        return $unavailable(
            'La calculadora de envíos está desactivada.'
        );
    }

    if (($c['confirmed'] ?? false) !== true) {
        return $unavailable(
            'Falta confirmar las tarifas en Administrador → Envíos.'
        );
    }

    if (empty($c['origin_postcode'])) {
        return $unavailable(
            'Falta configurar el código postal de origen en Administrador → Envíos.'
        );
    }

    $today = (
        new DateTimeImmutable('now', new DateTimeZone('Europe/Madrid'))
    )->format('Y-m-d');

    if (($c['valid_until'] ?? '') < $today) {
        return $unavailable(
            'La fecha de revisión de las tarifas está vencida o sin configurar.'
        );
    }

    $zones = shipping_array($c['province_zones'] ?? []);
    $zone = $zones[$province] ?? '';

    if (!in_array($zone, ['1', '2', '3', '3+', '4'], true)) {
        return $unavailable(
            'Falta configurar la zona de envío para la provincia ' . $province . '.'
        );
    }

    $taxes = shipping_array($c['tax_percent'] ?? []);
    $tax = $taxes[$zone] ?? null;

    if ($tax === null || $tax === '' || !is_numeric($tax)) {
        return $unavailable(
            'Falta configurar un impuesto válido para la zona ' . $zone . '.'
        );
    }

    if ($validateOnly) {
        return array_merge($result, ['ready_for_parcel' => true]);
    }

    $s = shipping_array($p['shipping'] ?? []);

    $fields = [
        'weight_g' => 'peso en gramos',
        'length_cm' => 'largo en centímetros',
        'width_cm' => 'ancho en centímetros',
        'height_cm' => 'alto en centímetros',
    ];

    foreach ($fields as $key => $label) {
        if (
            !is_numeric($s[$key] ?? null) ||
            !is_finite((float)$s[$key]) ||
            (float)$s[$key] <= 0
        ) {
            return $unavailable(
                'Falta guardar un valor válido de ' . $label .
                    ' del libro embalado en Publicaciones.'
            );
        }
    }

    $l = (float)$s['length_cm'];
    $w = (float)$s['width_cm'];
    $h = (float)$s['height_cm'];

    if (max($l, $w, $h) >= 120 || $l + $w + $h > 240) {
        return $unavailable(
            'Las medidas del paquete superan los límites configurados para el cálculo automático.'
        );
    }

    $billable = max(
        (float)$s['weight_g'] / 1000,
        $l * $w * $h / 6000
    );

    $index = null;

    foreach ([1, 2, 3, 4, 5, 10, 15] as $i => $limit) {
        if ($billable <= $limit) {
            $index = $i;
            break;
        }
    }

    if ($index === null) {
        return $unavailable(
            'El peso facturable supera los 15 kg contemplados en la calculadora.'
        );
    }

    $rates = shipping_array($c['rates'] ?? []);
    $zoneRates = shipping_array($rates[$zone] ?? []);
    $rate = $zoneRates[$index] ?? null;

    if (!is_numeric($rate) || (float)$rate <= 0) {
        return $unavailable(
            'Falta una tarifa válida para la zona ' . $zone .
                ' y el tramo de peso del paquete.'
        );
    }

    $base = (float)$rate;

    $transport = round(
        $base *
            (1 + (float)($c['surcharge_percent'] ?? 0) / 100) *
            (1 + (float)$tax / 100),
        2
    );

    $shipping = round(
        $transport + (float)($c['packaging_fee'] ?? 0),
        2
    );

    return array_merge($result, [
        'available' => true,
        'shipping_price' => $shipping,
        'total' => round($price + $shipping, 2),
        'service' => 'Correos Paq Estándar a domicilio',
        'message' => 'Importe calculado para un ejemplar. El autor confirmará el total antes del pago.',
    ]);
}

// Evita publicar la tabla privada del contrato aunque public_data() devuelva settings().
function shipping_public_data(): array
{
    $data = public_data();
    if (isset($data['config'])) {
        $data['config'] = shipping_array($data['config']);
        unset($data['config']['shipping']);
    }
    unset($data['shipping']);
    return $data;
}
// Selecciona un único embalaje para ejemplares iguales, apilados en una columna.
function shipping_quote(array $p, string $packageId, string $postcode, string $country, array $c, int $quantity = 1): array
{
    if ($quantity < 1 || $quantity > 100) throw new ValidationError('Introduce una cantidad entre 1 y 100.');
    $initial = shipping_quote_parcel($p, $packageId, $postcode, $country, $c, true);
    $ready = $initial['ready_for_parcel'] ?? false;
    unset($initial['ready_for_parcel']);
    $unit = (float)$initial['product_price'];
    $subtotal = round($unit * $quantity, 2);
    $decorate = static function (array $quote) use ($quantity, $unit, $subtotal): array {
        $quote['quantity'] = $quantity;
        $quote['unit_price'] = $unit;
        $quote['product_price'] = $subtotal;
        if ($quote['available']) $quote['total'] = round($subtotal + $quote['shipping_price'], 2);
        return $quote;
    };
    $consult = static function (string $message) use ($initial, $decorate): array {
        $quote = $initial;
        $quote['available'] = false;
        unset($quote['total'], $quote['shipping_price']);
        $quote['message'] = $message;
        return $decorate($quote);
    };
    if (!$ready) return $decorate($initial);
    $book = shipping_array($p['shipping'] ?? []);
    $rawReady = true;
    foreach (['book_weight_g', 'book_length_cm', 'book_width_cm', 'book_height_cm'] as $key) {
        if (!is_numeric($book[$key] ?? null) || (float)$book[$key] <= 0) $rawReady = false;
    }
    $configuredTypes = shipping_array($c['packaging_types'] ?? []);

    $anyTypeEnabled = !empty($configuredTypes['envelope']);

    if (!$rawReady) {
        return $consult('Envío a consultar: completa el peso, largo, ancho y grosor del libro SIN embalaje en Publicaciones.');
    }
    if (!$anyTypeEnabled) {
        return $consult('Envío a consultar: completa la configuración del sobre y guarda en Administrador → Envíos.');
    }
    $types = shipping_array($c['packaging_types'] ?? []);
    foreach (['envelope' => 'Sobre'] as $kind => $label) {
        $t = shipping_array($types[$kind] ?? []);
        
        $complete = true;
        foreach (['fee', 'weight_g', 'max_weight_kg', 'inner_length_cm', 'inner_width_cm', 'inner_height_cm', 'length_cm', 'width_cm', 'height_cm'] as $key) {
            if (!is_numeric($t[$key] ?? null)) $complete = false;
        }
        if (!$complete) continue;
        $bookSides = [(float)$book['book_length_cm'], (float)$book['book_width_cm']];
        $insideSides = [(float)$t['inner_length_cm'], (float)$t['inner_width_cm']];
        sort($bookSides);
        sort($insideSides);
        $weight = (float)$book['book_weight_g'] * $quantity + (float)$t['weight_g'];
        if (
            $bookSides[0] > $insideSides[0] || $bookSides[1] > $insideSides[1]
            || (float)$book['book_height_cm'] * $quantity > (float)$t['inner_height_cm']
            || $weight > 5000
        ) continue;
        $prepared = $p;
        $prepared['shipping'] = [
            'weight_g' => $weight,
            'length_cm' => $t['length_cm'],
            'width_cm' => $t['width_cm'],
            'height_cm' => $t['height_cm']
        ];
        $config = $c;
        $config['packaging_fee'] = (float)$t['fee'];
        $quote = shipping_quote_parcel($prepared, $packageId, $postcode, $country, $config);
        $quote['packaging_label'] = $label;
        $quote['packaging_fee'] = (float)$t['fee'];
        $quote['parcel_weight_kg'] = round($weight / 1000, 3);
        if ($quote['available']) $quote['message'] = 'Importe para ' . $quantity . ' ejemplar(es) en un único paquete. El envío incluye el embalaje. El autor confirmará el total antes del pago.';
        return $decorate($quote);
    }
    return $consult('Este pedido necesita confirmar el embalaje. Consúltame por WhatsApp y te indicaré los gastos de envío antes del pago.');
}
