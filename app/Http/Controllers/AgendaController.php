<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\ValidationError;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class AgendaController
{
    public function availabilityNext(Request $request): JsonResponse
    {
        $date = txt($request->query('after', ''), 10, true);
        $minutes = filter_var($request->query('duration', null), FILTER_VALIDATE_INT);
        if ($minutes === false) throw new ValidationError('Duración no válida.');
        return api_json(200, agenda_next($date, $minutes));
    }

    public function availability(Request $request): JsonResponse
    {
        $date = txt($request->query('date', ''), 10, true);
        $minutes = filter_var($request->query('duration', null), FILTER_VALIDATE_INT);
        if ($minutes === false) throw new ValidationError('Duración no válida.');
        return api_json(200, agenda_slots($date, $minutes));
    }

    public function adminAgenda(): JsonResponse
    {
        $d = body();
        $agenda = agenda_validate($d);
        query('UPDATE agenda_settings SET data=? WHERE id=1', [json_encode($agenda, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)]);
        return api_json(200, ['ok' => true]);
    }
}
