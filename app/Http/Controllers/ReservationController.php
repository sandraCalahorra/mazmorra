<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\ValidationError;
use DateTimeImmutable;
use Illuminate\Http\JsonResponse;
use Throwable;

final class ReservationController
{
    public function reserve(): JsonResponse
    {
        $d = body();
        rate_limit('booking', 10, 3600);
        if (($d['consent'] ?? false) !== true) throw new ValidationError('Acepta el uso de los datos para tramitar tu solicitud.');
        $name = txt($d['name'] ?? '', 80, true);
        $contact = txt($d['contact'] ?? '', 200, true);
        $notes = txt($d['notes'] ?? '', 1500);
        $players = number($d['players'] ?? null, 1, 20);
        $waiting = ($d['waitlist'] ?? false) === true;
        $gid = txt($d['game_id'] ?? '', 80, true);
        db()->beginTransaction();
        $game = query('SELECT * FROM games WHERE id=? FOR UPDATE', [$gid])->fetch();
        if (!$game || $game['status'] !== 'open' || $game['starts'] <= gmdate('Y-m-d\TH:i:s\Z')) throw new ValidationError('Esta partida no admite nuevas solicitudes.');
        if ($waiting && (int)$game['capacity'] - reserved($gid) > 0) throw new ValidationError('Ya hay plazas disponibles. Actualiza el calendario y solicita una plaza.');
        if (!$waiting && $players > (int)$game['capacity'] - reserved($gid)) throw new ValidationError('No quedan suficientes plazas. Actualiza el calendario.');
        if (query("SELECT id FROM reservations WHERE game_id=? AND LOWER(contact)=LOWER(?) AND status IN ('pending','confirmed','waitlisted')", [$gid, $contact])->fetch()) throw new ValidationError('Ya hay una solicitud activa para este contacto y partida.');
        $bookingUser = ((session('expires', 0)) > time()) ? (session('user_id')) : null;
        if ($bookingUser && query("SELECT r.id FROM reservations r JOIN user_reservations ur ON ur.reservation_id=r.id WHERE ur.user_id=? AND r.game_id=? AND r.status IN ('pending','confirmed','waitlisted')", [$bookingUser, $gid])->fetch()) throw new ValidationError('Ya tienes una solicitud activa para esta partida.');
        $rid = bin2hex(random_bytes(8));
        query('INSERT INTO reservations(id,game_id,name,contact,players,notes,created) VALUES(?,?,?,?,?,?,?)', [$rid, $gid, $name, $contact, $players, $notes, gmdate('Y-m-d\TH:i:s\Z')]);
        if ($waiting) query("UPDATE reservations SET status='waitlisted' WHERE id=?", [$rid]);
        if ($bookingUser) query('INSERT INTO user_reservations(reservation_id,user_id) VALUES(?,?)', [$rid, $bookingUser]);
        db()->commit();
        return api_json(201, ['ok' => true, 'reference' => $rid, 'waitlisted' => $waiting]);
    }

    public function adminGame(): JsonResponse
    {
        $d = body();
        $id = txt($d['id'] ?? '', 80) ?: bin2hex(random_bytes(8));
        $title = txt($d['title'] ?? '', 160, true);
        $starts = date_value($d['starts'] ?? '');
        $capacity = number($d['capacity'] ?? null, 1, 100);
        $status = $d['status'] ?? 'open';
        if (!in_array($status, ['open', 'closed', 'cancelled'], true)) throw new ValidationError('Estado no válido.');
        db()->beginTransaction();
        query('SELECT id FROM games WHERE id=? FOR UPDATE', [$id])->fetch();
        if ($capacity < reserved($id)) throw new ValidationError('El aforo no puede ser menor que las plazas confirmadas.');
        query('INSERT INTO games(id,title,starts,capacity,price,mode,duration,description,status) VALUES(?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE title=VALUES(title),starts=VALUES(starts),capacity=VALUES(capacity),price=VALUES(price),mode=VALUES(mode),duration=VALUES(duration),description=VALUES(description),status=VALUES(status)', [$id, $title, $starts, $capacity, txt($d['price'] ?? '', 80), txt($d['mode'] ?? '', 100), txt($d['duration'] ?? '', 100), txt($d['description'] ?? '', 3000), $status]);
        if ($status === 'cancelled') query("UPDATE reservations SET status='cancelled' WHERE game_id=? AND status IN ('pending','confirmed','waitlisted')", [$id]);
        db()->commit();

        return api_json(200, ['ok' => true]);
    }

    public function adminReservationArchive(): JsonResponse
    {
        $d = body();
        $rid = txt($d['id'] ?? '', 80, true);
        if (!is_bool($d['archived'] ?? null)) throw new ValidationError('Indica si quieres archivar o restaurar.');
        $r = query('SELECT game_id FROM reservations WHERE id=?', [$rid])->fetch();
        if (!$r) throw new ValidationError('Reserva no encontrada.');
        db()->beginTransaction();
        query('SELECT id FROM games WHERE id=? FOR UPDATE', [$r['game_id']])->fetch();
        $r = query('SELECT * FROM reservations WHERE id=? FOR UPDATE', [$rid])->fetch();
        if (!$r) throw new ValidationError('Reserva no encontrada.');
        if ($d['archived'] && !in_array($r['status'], ['rejected', 'cancelled'], true)) throw new ValidationError('Rechaza o cancela la solicitud antes de archivarla.');
        query('UPDATE reservations SET archived=? WHERE id=?', [(int)$d['archived'], $rid]);
        db()->commit();
        return api_json(200, ['ok' => true, 'message' => $d['archived'] ? 'Solicitud archivada. El historial del usuario se conserva.' : 'Solicitud restaurada en la lista principal.']);
    }

    public function adminReservation(): JsonResponse
    {
        $d = body();
        $rid = txt($d['id'] ?? '', 80, true);
        $status = $d['status'] ?? '';
        if (!in_array($status, ['pending', 'confirmed', 'waitlisted', 'rejected', 'cancelled'], true)) throw new ValidationError('Estado no válido.');
        $r = query('SELECT game_id FROM reservations WHERE id=?', [$rid])->fetch();
        if (!$r) throw new ValidationError('Reserva no encontrada.');
        db()->beginTransaction();
        $g = query('SELECT * FROM games WHERE id=? FOR UPDATE', [$r['game_id']])->fetch();
        $r = query('SELECT * FROM reservations WHERE id=? FOR UPDATE', [$rid])->fetch();
        if (!$r || !$g) throw new ValidationError('Reserva o partida no encontrada.');
        if ((bool)$r['archived']) throw new ValidationError('Restaura la solicitud antes de modificarla.');
        if (in_array($status, ['pending', 'confirmed', 'waitlisted'], true) && $g['status'] === 'cancelled') throw new ValidationError('La partida está cancelada.');
        if ($status === 'confirmed' && reserved($g['id'], $rid) + (int)$r['players'] > (int)$g['capacity']) throw new ValidationError('No quedan plazas suficientes para confirmar.');
        if ($status === 'confirmed' && $r['status'] !== 'confirmed') {
            $starts = new DateTimeImmutable($g['starts']);
            $now = new DateTimeImmutable('now');
            if ($starts <= $now) throw new ValidationError('No puedes confirmar una partida que ya ha comenzado.');
            if ($starts->getTimestamp() - $now->getTimestamp() < 86400 && ($d['accept_short_notice'] ?? false) !== true) throw new ValidationError('Faltan menos de 24 horas desde esta confirmación. Revisa el horario o marca la aceptación excepcional del aviso.');
        }
        $retry = ($d['retry_email'] ?? false) === true;
        if ($retry && ($r['status'] !== 'rejected' || $status !== 'rejected')) throw new ValidationError('Solo se puede reintentar el aviso de una solicitud rechazada.');
        $newRejection = $status === 'rejected' && ($r['status'] !== 'rejected' || trim((string)($r['rejection_reason'] ?? '')) === '');
        $reason = $newRejection ? txt($d['rejection_reason'] ?? '', 2000, true) : ($r['rejection_reason'] ?? '');
        if ($status === 'rejected' && trim($reason) === '') throw new ValidationError('Escribe el mensaje que recibirá el usuario.');
        $sendEmail = $newRejection || ($retry && in_array($r['rejection_email_status'], ['failed', 'not_configured', 'no_recipient'], true));
        if ($retry && !$sendEmail) throw new ValidationError('El aviso ya está enviado o su envío está pendiente de comprobar. No se reenviará automáticamente.');
        $noticeId = $sendEmail ? bin2hex(random_bytes(16)) : $r['rejection_notice_id'];
        $emailStatus = $sendEmail ? 'pending' : $r['rejection_email_status'];
        if ($status !== 'rejected') {
            $reason = null;
            $emailStatus = 'none';
            $noticeId = null;
        }
        $paid = array_key_exists('paid', $d) ? (int)($d['paid'] === true) : (int)$r['paid'];
        query('UPDATE reservations SET status=?,paid=?,rejection_reason=?,rejection_email_status=?,rejection_notice_id=?,rejection_email_sent_at=? WHERE id=?', [$status, $paid, $reason, $emailStatus, $noticeId, $sendEmail || $status !== 'rejected' ? null : $r['rejection_email_sent_at'], $rid]);
        db()->commit();
        if ($sendEmail) {
            try {
                $r['rejection_reason'] = $reason;
                $emailStatus = reservation_rejection_email($r, $g);
                query("UPDATE reservations SET rejection_email_status=?,rejection_email_sent_at=? WHERE id=? AND rejection_notice_id=? AND status='rejected'", [$emailStatus, $emailStatus === 'sent' ? gmdate('Y-m-d\TH:i:s\Z') : null, $rid, $noticeId]);
            } catch (Throwable $e) {
                // El rechazo ya está guardado. No afirmar que la operación completa falló.
                $emailStatus = 'pending';
                error_log('Reserva: resultado del aviso pendiente de comprobar');
            }
        }
        $mailMessages = [
            'sent' => 'El servidor de correo ha aceptado el aviso para su envío.',
            'failed' => 'El correo no se ha podido confirmar como enviado. Revisa SMTP antes de reintentar; un fallo puede dejar el resultado incierto.',
            'not_configured' => 'El correo no se ha enviado: falta configurar SMTP o instalar PHPMailer.',
            'no_recipient' => 'El correo no se ha enviado: no hay una dirección de email válida.',
            'pending' => 'El envío del correo está pendiente de comprobar. No se reenviará para evitar duplicados.',
        ];
        return api_json(200, ['ok' => true, 'email_status' => $emailStatus, 'message' => $status === 'rejected' ? 'Solicitud rechazada. El motivo está disponible en la cuenta vinculada. ' . ($mailMessages[$emailStatus] ?? '') : 'Reserva guardada.']);
    }
}
