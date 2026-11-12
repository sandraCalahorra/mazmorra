<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\ValidationError;
use Illuminate\Http\JsonResponse;

final class ShippingController
{
    public function shippingQuote(): JsonResponse
    {
        $d = body();
        rate_limit('shipping-quote', 120, 3600);

        $id = txt($d['product_id'] ?? '', 80, true);
        $row = query(
            'SELECT data FROM products WHERE id=?',
            [$id]
        )->fetch();

        if (!$row) {
            throw new ValidationError('Publicación no encontrada.');
        }

        $p = json_decode(
            $row['data'],
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        $country = txt($d['country'] ?? 'ES', 2, true);

        if (!preg_match('/^[A-Z]{2}$/D', $country)) {
            throw new ValidationError('País no válido.');
        }

        $quantity = filter_var(
            $d['quantity'] ?? null,
            FILTER_VALIDATE_INT,
            ['options' => ['min_range' => 1, 'max_range' => 100]]
        );

        if ($quantity === false) {
            throw new ValidationError(
                'Introduce una cantidad entre 1 y 100.'
            );
        }

        $postcode = txt($d['postcode'] ?? '', 20);
        $city = txt($d['city'] ?? '', 180, true);

        if ($country === 'ES') {
            if (!in_array($city, localidades_es($postcode), true)) {
                throw new ValidationError(
                    'Selecciona una localidad asociada al código postal.'
                );
            }
        }

        $config = shipping_defaults(
            shipping_array(shipping_raw_settings()['shipping'] ?? [])
        );

        $quote = shipping_quote(
            $p,
            txt($d['package_id'] ?? '', 80, true),
            $postcode,
            $country,
            $config,
            $quantity
        );

        return api_json(200, $quote);
    }

    public function adminShipping(): JsonResponse
    {
        $d = body();
        $config = shipping_raw_settings();
        $config['shipping'] = shipping_validate_config($d);
        query('UPDATE settings SET data=? WHERE id=1', [json_encode($config, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)]);
        return api_json(200, ['ok' => true]);
    }
}
