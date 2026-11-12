<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\ValidationError;
use Illuminate\Http\JsonResponse;
use stdClass;

final class CatalogController
{
    public function publicData(): JsonResponse
    {
        return api_json(200, shipping_public_data());
    }

    public function adminProduct(): JsonResponse
    {
        $d = body();
        $id = txt($d['id'] ?? '', 80) ?: bin2hex(random_bytes(8));
        $p = [];
        foreach (['title' => 160, 'label' => 100, 'level' => 80, 'players' => 80, 'duration' => 100, 'intro' => 400, 'description' => 6000, 'price' => 80, 'status' => 80] as $key => $limit) $p[$key] = txt($d[$key] ?? '', $limit, $key === 'title');
        $rate = $d['session_rate'] ?? '';

        if ($rate === '' || $rate === null) {
            $p['session_rate'] = null;
        } else {
            if (!is_string($rate) && !is_numeric($rate)) {
                throw new ValidationError('La tarifa de partida no es válida.');
            }

            $normalizedRate = str_replace(',', '.', (string)$rate);

            if (
                !is_numeric($normalizedRate) ||
                !is_finite((float)$normalizedRate) ||
                (float)$normalizedRate <= 0 ||
                (float)$normalizedRate > 10000
            ) {
                throw new ValidationError(
                    'La tarifa debe ser mayor que 0 y no superar 10.000 €/hora.'
                );
            }

            $p['session_rate'] = round((float)$normalizedRate, 2);
        }
        $type = $d['type'] ?? 'aventura';
        if (!in_array($type, ['aventura', 'compendio'], true)) throw new ValidationError('Categoría no válida.');
        $demo = txt($d['demo'] ?? '', 300);
        if ($demo !== '' && !preg_match('~^https://heyzine\.com/flip-book/[a-zA-Z0-9_-]+\.html$~D', $demo)) throw new ValidationError('La demo debe ser un enlace https://heyzine.com/flip-book/identificador.html');
        $p = array_merge($p, ['demo' => $demo, 'id' => $id, 'type' => $type, 'cover' => web_url($d['cover'] ?? '', true), 'published' => ($d['published'] ?? false) === true, 'color' => '', 'icon' => '✧']);

        $physicalStock = $d['physical_stock'] ?? 'unknown';

        if (!in_array(
            $physicalStock,
            ['unknown', 'available', 'out', 'digital'],
            true
        )) {
            throw new ValidationError('Selecciona un stock físico válido.');
        }

        $p['physical_stock'] = $physicalStock;

        // Formato de venta de la publicación.
        $saleFormat = $d['sale_format'] ?? '';

        if (!in_array($saleFormat, ['digital', 'physical', 'both'], true)) {
            throw new ValidationError('Selecciona el formato de venta.');
        }

        $p['sale_format'] = $saleFormat;

        $pages = $d['pages'] ?? '';

        if ($pages === '' || $pages === null) {
            $p['pages'] = null;
        } else {
            $validatedPages = filter_var(
                $pages,
                FILTER_VALIDATE_INT,
                ['options' => ['min_range' => 1, 'max_range' => 10000]]
            );

            if ($validatedPages === false) {
                throw new ValidationError('Introduce un número de páginas entre 1 y 10.000.');
            }

            $p['pages'] = $validatedPages;
        }

        $allowedPackages = [
            'pdf' => 'digital',
            'pdf_vtt' => 'digital',
            'pdf_vtt_json' => 'digital',
            'book' => 'physical',
            'book_pdf' => 'physical',
            'book_pdf_vtt' => 'physical',
            'book_pdf_vtt_json' => 'physical',
        ];

        $packages = $d['purchase_packages'] ?? [];

        if (!is_array($packages) || count($packages) > count($allowedPackages)) {
            throw new ValidationError('Opciones de compra no válidas.');
        }

        $cleanPackages = [];
        $seenPackages = [];

        foreach ($packages as $package) {
            // Los objetos del JSON llegan como stdClass.
            if ($package instanceof stdClass) {
                $package = (array) $package;
            }

            if (!is_array($package)) {
                throw new ValidationError('Paquete no válido.');
            }

            $packageId = $package['id'] ?? '';

            if (
                !is_string($packageId) ||
                !isset($allowedPackages[$packageId]) ||
                isset($seenPackages[$packageId])
            ) {
                throw new ValidationError('Paquete desconocido o repetido.');
            }

            $price = $package['price'] ?? null;

            if (
                (!is_int($price) && !is_float($price)) ||
                !is_finite((float) $price) ||
                $price < 0.01 ||
                $price > 10000
            ) {
                throw new ValidationError('Indica un precio entre 0,01 y 10.000 €.');
            }

            $packageFormat = $allowedPackages[$packageId];

            if ($saleFormat !== 'both' && $saleFormat !== $packageFormat) {
                throw new ValidationError(
                    'Los paquetes deben coincidir con el formato de venta seleccionado.'
                );
            }

            $seenPackages[$packageId] = true;

            $cleanPackages[] = [
                'id' => $packageId,
                'price' => round((float) $price, 2),
            ];
        }

        $p['purchase_packages'] = $cleanPackages;
        if (array_intersect(
            ['shipping_book_weight_g', 'shipping_book_length_cm', 'shipping_book_width_cm', 'shipping_book_height_cm'],
            array_keys($d)
        )) {
            $p['shipping'] = shipping_product_data($d);
        } else {
            $old = query('SELECT data FROM products WHERE id=?', [$id])->fetch();
            $oldData = $old ? json_decode($old['data'], true, 512, JSON_THROW_ON_ERROR) : [];
            $p['shipping'] = $oldData['shipping'] ?? [];
        }


        // Mantiene un precio visible compatible con las cards actuales.
        if ($cleanPackages) {
            $minimumPrice = min(array_column($cleanPackages, 'price'));

            $p['price'] = (count($cleanPackages) > 1 ? 'Desde ' : '')
                . number_format($minimumPrice, 2, ',', '.')
                . ' €';
        } else {
            $p['price'] = 'Precio por confirmar';
        }
        query('INSERT INTO products(id,data) VALUES(?,?) ON DUPLICATE KEY UPDATE data=VALUES(data)', [$id, json_encode($p, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)]);

        return api_json(200, ['ok' => true]);
    }

    public function adminProductDelete(): JsonResponse
    {
        $d = body();
        query('DELETE FROM products WHERE id=?', [txt($d['id'] ?? '', 80, true)]);

        return api_json(200, ['ok' => true]);
    }
}
