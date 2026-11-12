<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\ValidationError;
use Illuminate\Http\JsonResponse;

final class GameRequestController
{
    public function submitGameRequest(): JsonResponse
    {
        $d = body();
        return api_json(200, game_request_submit($d));
    }

    public function adminGameRequest(): JsonResponse
    {
        $d = body();
        return api_json(200, game_request_manage($d));
    }

    public function adminCommissionedGame(): JsonResponse
    {
        $d = body();
        $id = txt($d['id'] ?? '', 80) ?: bin2hex(random_bytes(16));

        $item = ['id' => $id];

        foreach (
            [
                'title' => 160,
                'level' => 80,
                'description' => 6000,
            ] as $key => $limit
        ) {
            $item[$key] = txt(
                $d[$key] ?? '',
                $limit,
                $key === 'title'
            );
        }

        $choices = [
            'origin' => ['mia', 'oficial'],
            'format' => [
                'Partida única',
                'Aventura de varias sesiones',
                'Campaña corta',
                'Campaña larga',
            ],
            'hours' => ($d['format'] ?? '') === 'Partida única'
                ? ['4']
                : ['2', '2.5', '3', '4'],
            'language' => ['es', 'en'],
        ];

        foreach ($choices as $key => $allowed) {
            $value = $d[$key] ?? '';

            if (!in_array($value, $allowed, true)) {
                throw new ValidationError(
                    'Selecciona una opción válida en ' . $key . '.'
                );
            }

            $item[$key] = $value;
        }

        $rawRate = $d['hourly_rate'] ?? '';

        if ($rawRate === '' || $rawRate === null) {
            $item['hourly_rate'] = null;
        } else {
            if (!is_string($rawRate) && !is_numeric($rawRate)) {
                throw new ValidationError('Tarifa no válida.');
            }

            $normalized = str_replace(',', '.', (string)$rawRate);

            if (
                !is_numeric($normalized) ||
                !is_finite((float)$normalized) ||
                (float)$normalized <= 0 ||
                (float)$normalized > 10000
            ) {
                throw new ValidationError(
                    'La tarifa debe ser mayor que 0 y no superar 10.000 €/hora.'
                );
            }

            $item['hourly_rate'] = round((float)$normalized, 2);
        }

        // Portadas locales del catálogo: carpeta y extensiones limitadas.
        $cover = $d['cover'] ?? '';
        if (!is_string($cover)) {
            throw new ValidationError('La portada debe ser una ruta de imagen o una dirección HTTPS.');
        }
        $cover = trim($cover);
        if (preg_match('~\Aimages/campanas/[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g)\z~i', $cover) === 1) {
            $item['cover'] = $cover;
        } else {
            // Conserva la validación existente para las demás direcciones.
            $item['cover'] = web_url($cover, true);
        }
        $item['published'] = ($d['published'] ?? false) === true;

        query(
            'INSERT INTO commissioned_games(id,data) VALUES(?,?)
         ON DUPLICATE KEY UPDATE data=VALUES(data)',
            [
                $id,
                json_encode(
                    $item,
                    JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
                ),
            ]
        );

        return api_json(200, ['ok' => true]);
    }

    public function adminCommissionedGameDelete(): JsonResponse
    {
        $d = body();
        query(
            'DELETE FROM commissioned_games WHERE id=?',
            [txt($d['id'] ?? '', 80, true)]
        );

        return api_json(200, ['ok' => true]);
    }
}
