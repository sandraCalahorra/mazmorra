<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Exceptions\ValidationError;

final class DeleteRequestController
{
    public function __invoke(): JsonResponse
    {
        $data = body();
        if (($data['confirmation'] ?? '') !== 'DELETE') {
            throw new ValidationError('Confirma la eliminación definitiva.');
        }

        $id = txt($data['id'] ?? '', 80, true);
        $type = $data['type'] ?? '';
        if (!in_array($type, ['session', 'commissioned'], true)) {
            throw new ValidationError('Tipo de solicitud no válido.');
        }
        $expected = txt($data['expected_status'] ?? '', 20, true);

        $connection = db();
        $connection->beginTransaction();
        // Mismo orden de bloqueo que las confirmaciones de encargos.
        query('SELECT id FROM agenda_settings WHERE id=1 FOR UPDATE')->fetch();
        if ($type === 'commissioned') {
            $row = query('SELECT id,status FROM game_requests WHERE id=? FOR UPDATE', [$id])->fetch();
        } else {
            $game = query('SELECT game_id FROM reservations WHERE id=?', [$id])->fetch();
            if ($game) {
                query('SELECT id FROM games WHERE id=? FOR UPDATE', [$game['game_id']])->fetch();
            }
            $row = query('SELECT id,status FROM reservations WHERE id=? FOR UPDATE', [$id])->fetch();
        }

        if (!$row) {
            $connection->commit();
            return api_json(200, ['ok' => true, 'message' => 'La solicitud ya no existe.']);
        }
        if ($row['status'] !== $expected) {
            throw new ValidationError('El estado ha cambiado. Actualiza los datos y revisa la solicitud antes de eliminarla.');
        }

        if ($type === 'commissioned') {
            query('DELETE FROM game_requests WHERE id=?', [$id]);
        } else {
            query('DELETE FROM user_reservations WHERE reservation_id=?', [$id]);
            query('DELETE FROM reservations WHERE id=?', [$id]);
        }
        $connection->commit();

        return api_json(200, ['ok' => true, 'message' => 'Solicitud eliminada definitivamente.']);
    }
}
