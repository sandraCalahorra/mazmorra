<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\ValidationError;
use Illuminate\Http\JsonResponse;
use RuntimeException;
use stdClass;

final class AdminDashboardController
{
    public function adminState(): JsonResponse
    {
        $csrf = admin();
        $rows = query('SELECT r.*,g.title AS game_title,g.starts FROM reservations r JOIN games g ON g.id=r.game_id ORDER BY r.created DESC')->fetchAll();
        foreach ($rows as &$r) {
            $r['paid'] = (bool)$r['paid'];
            $r['players'] = (int)$r['players'];
            $r['archived'] = (bool)$r['archived'];
        }
        unset($r);
        $rows = array_merge($rows, game_request_rows());
        return api_json(200, [
            'csrf' => $csrf,
            'agenda' => agenda_config(),
            'products' => products(),
            'commissioned_games' => commissioned_games(),
            'games' => games(),
            'reservations' => $rows,
            'config' => settings(),
            'shipping' => shipping_defaults(shipping_array(shipping_raw_settings()['shipping'] ?? [])),
        ]);
    }

    public function adminConfig(): JsonResponse
    {
        $d = body();
        $phone = txt($d['whatsapp'] ?? '', 20);
        if ($phone !== '' && !preg_match('/^[0-9]{8,15}$/D', $phone)) throw new ValidationError('WhatsApp: prefijo de país y número, solo dígitos.');
        $paypal = web_url($d['paypal'] ?? '');
        if ($paypal !== '' && !in_array(strtolower(parse_url($paypal, PHP_URL_HOST)), ['paypal.me', 'www.paypal.me', 'paypal.com', 'www.paypal.com'], true)) throw new ValidationError('Utiliza un enlace de PayPal.');
        $previews = $d['previews'] ?? settings()['previews'];
        if (!is_array($previews) || count($previews) > 50) throw new ValidationError('Puedes añadir hasta 50 muestras.');
        $clean = [];
        foreach ($previews as $preview) {
            if ($preview instanceof stdClass) $preview = (array)$preview;
            if (!is_array($preview)) throw new ValidationError('Muestra no válida.');
            $title = txt($preview['title'] ?? '', 160, true);
            $url = txt($preview['url'] ?? '', 300, true);
            if (!preg_match('~^https://heyzine\.com/flip-book/[a-zA-Z0-9_-]+\.html$~D', $url)) throw new ValidationError('Utiliza un enlace de publicación: https://heyzine.com/flip-book/identificador.html');
            $clean[] = ['title' => $title, 'url' => $url];
        }
        $c = ['previews' => $clean, 'whatsapp' => $phone, 'paypal' => $paypal, 'email' => txt($d['email'] ?? '', 200), 'delivery' => txt($d['delivery'] ?? '', 1000)];
        $c = array_replace(shipping_raw_settings(), $c);
        query('UPDATE settings SET data=? WHERE id=1', [json_encode($c, JSON_THROW_ON_ERROR)]);

        return api_json(200, ['ok' => true]);
    }

    public function adminUpload(): JsonResponse
    {
        $d = body();
        $raw = is_string($d['content'] ?? null) ? base64_decode($d['content'], true) : false;
        if ($raw === false || strlen($raw) > 2500000) throw new ValidationError('Imagen no válida o superior a 2,5 MB.');
        $info = @getimagesizefromstring($raw);
        if (!$info || !in_array($info['mime'], ['image/png', 'image/jpeg', 'image/webp'], true) || $info[0] * $info[1] > 12000000) throw new ValidationError('Utiliza PNG, JPG o WebP de menos de 12 megapíxeles.');
        // Decodificar y volver a codificar evita conservar contenido añadido al archivo.
        if (!function_exists('imagecreatefromstring')) throw new ValidationError('Activa la extensión GD en php.ini y reinicia Apache.');
        $image = @imagecreatefromstring($raw);
        if (!$image) throw new ValidationError('No se pudo leer la imagen.');
        imagealphablending($image, false);
        imagesavealpha($image, true);
        $filename = bin2hex(random_bytes(16)) . '.png';
        $ok = imagepng($image, public_path('uploads/' . $filename));
        imagedestroy($image);
        if (!$ok) throw new RuntimeException('Upload failed');
        return api_json(201, ['url' => 'uploads/' . $filename]);
    }
}
