<?php
declare(strict_types=1);

function reservation_rejection_email(array $reservation, array $game): string
{
    // Solo usa el correo de la cuenta vinculada o un contacto que sea un email válido.
    $user = ($reservation['request_type']??'')==='commissioned'
        ? query('SELECT email FROM users WHERE id=?',[$reservation['user_id']??''])->fetch()
        : query('SELECT u.email FROM users u JOIN user_reservations ur ON ur.user_id=u.id WHERE ur.reservation_id=? LIMIT 1', [$reservation['id']])->fetch();
    $recipient = $user['email'] ?? '';
    if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) $recipient = trim((string)$reservation['contact']);
    if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) return 'no_recipient';
    $path = app_path('reservation-mail.php');
    if (!is_file($path)) return 'not_configured';
    $cfg = require $path;
    if (!is_array($cfg) || ($cfg['enabled'] ?? false) !== true) return 'not_configured';
    if (!class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) return 'not_configured';
    if (empty($cfg['host']) || !filter_var($cfg['from_email'] ?? '', FILTER_VALIDATE_EMAIL)) return 'not_configured';
    try {
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = (string)$cfg['host'];
        $mail->SMTPAuth = true;
        $mail->Username = (string)($cfg['username'] ?? '');
        $mail->Password = (string)($cfg['password'] ?? '');
        $mail->SMTPSecure = ($cfg['encryption'] ?? 'tls') === 'ssl'
            ? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
            : \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = (int)($cfg['port'] ?? 587);
        $mail->Timeout = 15;
        $mail->CharSet = 'UTF-8';
        $mail->setFrom($cfg['from_email'], $cfg['from_name'] ?? 'La Mazmorra del Roleo');
        $mail->addAddress($recipient);
        $mail->isHTML(false);
        $mail->Subject = 'Actualización de tu solicitud de partida';
        $date = (new DateTimeImmutable($game['starts']))->setTimezone(new DateTimeZone('Europe/Madrid'))->format('d/m/Y H:i');
        $mail->Body = 'Hola, ' . $reservation['name'] . ".\n\n"
            . 'Tu solicitud para «' . $game['title'] . '», del ' . $date . " (Madrid), ha sido rechazada.\n\n"
            . "Mensaje del máster:\n" . $reservation['rejection_reason'] . "\n\n"
            . 'Referencia: ' . $reservation['id'] . ".\n"
            . "Si ya habías realizado un pago, contacta conmigo para revisar su devolución.\n\n"
            . 'Hugo · La Mazmorra del Roleo';
        $mail->send();
        return 'sent'; // Aceptado por el servidor SMTP; no garantiza lectura o entrega final.
    } catch (Throwable $e) {
        error_log('Reserva: fallo de envío SMTP (' . get_class($e) . ')');
        return 'failed';
    }
}
