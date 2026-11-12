<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class LocalityController
{
    public function __invoke(Request $request): JsonResponse
    {
        $postcode = $request->query('postcode', '');
        if (!is_string($postcode) || !preg_match('/^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/D', $postcode)) {
            return api_json(400, ['error' => 'Introduce un código postal español de cinco cifras.']);
        }

        return api_json(200, ['postcode' => $postcode, 'cities' => localidades_es($postcode)]);
    }
}
