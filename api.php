<?php

declare(strict_types=1);
require __DIR__ . '/app/bootstrap.php';
require_once __DIR__ . '/app/shipping.php';
require_once __DIR__ . '/app/localidades.php';
require_once __DIR__ . '/app/agenda.php';
require_once __DIR__ . '/app/game-requests.php';
require_once __DIR__ . '/app/reservation-notifications.php';
try {
    $route = $_GET['route'] ?? '';
    $method = $_SERVER['REQUEST_METHOD'];
    if (!is_string($route)) json_response(400, ['error' => 'Ruta no válida.']);
    if ($method === 'GET') {
        if ($route === '/api/availability/next') {
            header('Cache-Control: no-store');
            $date = txt($_GET['after'] ?? '', 10, true);
            $minutes = filter_var($_GET['duration'] ?? null, FILTER_VALIDATE_INT);
            if ($minutes === false) throw new ValidationError('Duración no válida.');
            json_response(200, agenda_next($date, $minutes));
        }
        if ($route === '/api/availability') {
            header('Cache-Control: no-store');
            $date = txt($_GET['date'] ?? '', 10, true);
            $minutes = filter_var($_GET['duration'] ?? null, FILTER_VALIDATE_INT);
            if ($minutes === false) throw new ValidationError('Duración no válida.');
            json_response(200, agenda_slots($date, $minutes));
        }
        if ($route === '/api/public') json_response(200, shipping_public_data());
        if ($route === '/api/admin/state') {
            $csrf = admin();
            $rows = query('SELECT r.*,g.title AS game_title,g.starts FROM reservations r JOIN games g ON g.id=r.game_id ORDER BY r.created DESC')->fetchAll();
            foreach ($rows as &$r) {
                $r['paid'] = (bool)$r['paid'];
                $r['players'] = (int)$r['players'];
                $r['archived'] = (bool)$r['archived'];
            }
            unset($r);
            $rows = array_merge($rows, game_request_rows());
            json_response(200, [
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
        json_response(404, ['error' => 'Ruta no encontrada.']);
    }
    if ($method !== 'POST') json_response(405, ['error' => 'Método no permitido.']);
    check_origin();
    $d = body();
    if ($route === '/api/game-requests') json_response(200, game_request_submit($d));
    if ($route === '/api/login') {
        rate_limit('login', 8, 900);
        $username = txt($d['username'] ?? '', 80);
        $password = $d['password'] ?? '';
        if (!is_string($password) || strlen($password) > 1024) throw new ValidationError('Contraseña no válida.');
        $user = query('SELECT * FROM admins WHERE id=1')->fetch();
        if (!$user) json_response(503, ['error' => 'Crea el administrador en instalar.php.']);
        if (!password_verify($password, $user['password_hash']) || !hash_equals($user['username'], $username)) json_response(401, ['error' => 'Usuario o contraseña incorrectos.']);
        start_session();
        session_regenerate_id(true);
        $_SESSION = ['admin' => 1, 'csrf' => bin2hex(random_bytes(32)), 'expires' => time() + 28800];
        if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) query('UPDATE admins SET password_hash=? WHERE id=1', [password_hash($password, PASSWORD_DEFAULT)]);
        json_response(200, ['ok' => true]);
    }
    if ($route === '/api/reservations') {
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
        start_session();
        $bookingUser = (($_SESSION['expires'] ?? 0) > time()) ? ($_SESSION['user_id'] ?? null) : null;
        session_write_close();
        if ($bookingUser && query("SELECT r.id FROM reservations r JOIN user_reservations ur ON ur.reservation_id=r.id WHERE ur.user_id=? AND r.game_id=? AND r.status IN ('pending','confirmed','waitlisted')", [$bookingUser, $gid])->fetch()) throw new ValidationError('Ya tienes una solicitud activa para esta partida.');
        $rid = bin2hex(random_bytes(8));
        query('INSERT INTO reservations(id,game_id,name,contact,players,notes,created) VALUES(?,?,?,?,?,?,?)', [$rid, $gid, $name, $contact, $players, $notes, gmdate('Y-m-d\TH:i:s\Z')]);
        if ($waiting) query("UPDATE reservations SET status='waitlisted' WHERE id=?", [$rid]);
        if ($bookingUser) query('INSERT INTO user_reservations(reservation_id,user_id) VALUES(?,?)', [$rid, $bookingUser]);
        db()->commit();
        json_response(201, ['ok' => true, 'reference' => $rid, 'waitlisted' => $waiting]);
    }
    if ($route === '/api/shipping/quote') {
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

        json_response(200, $quote);
    }
    admin(true);
    if ($route === '/api/admin/game-request') json_response(200, game_request_manage($d));
    if ($route === '/api/admin/agenda') {
        $agenda = agenda_validate($d);
        query('UPDATE agenda_settings SET data=? WHERE id=1', [json_encode($agenda, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)]);
        json_response(200, ['ok' => true]);
    }
    if ($route === '/api/admin/shipping') {
        $config = shipping_raw_settings();
        $config['shipping'] = shipping_validate_config($d);
        query('UPDATE settings SET data=? WHERE id=1', [json_encode($config, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)]);
        json_response(200, ['ok' => true]);
    }
    if ($route === '/api/logout') {
        start_session();
        $_SESSION = [];
        session_destroy();
        $params = session_get_cookie_params();
        unset($params['lifetime']);
        setcookie('mazmorra_admin', '', array_merge($params, ['expires' => time() - 3600]));
        json_response(200, ['ok' => true]);
    }

    if ($route === '/api/admin/commissioned-game') {
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

        json_response(200, ['ok' => true]);
    }

    if ($route === '/api/admin/commissioned-game/delete') {
        query(
            'DELETE FROM commissioned_games WHERE id=?',
            [txt($d['id'] ?? '', 80, true)]
        );

        json_response(200, ['ok' => true]);
    }


    if ($route === '/api/admin/product') {
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
    } elseif ($route === '/api/admin/product/delete') {
        query('DELETE FROM products WHERE id=?', [txt($d['id'] ?? '', 80, true)]);
    } elseif ($route === '/api/admin/game') {
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
    } elseif ($route === '/api/admin/reservation/archive') {
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
        json_response(200, ['ok' => true, 'message' => $d['archived'] ? 'Solicitud archivada. El historial del usuario se conserva.' : 'Solicitud restaurada en la lista principal.']);
    } elseif ($route === '/api/admin/reservation') {
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
        json_response(200, ['ok' => true, 'email_status' => $emailStatus, 'message' => $status === 'rejected' ? 'Solicitud rechazada. El motivo está disponible en la cuenta vinculada. ' . ($mailMessages[$emailStatus] ?? '') : 'Reserva guardada.']);
    } elseif ($route === '/api/admin/config') {
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
    } elseif ($route === '/api/admin/upload') {
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
        $ok = imagepng($image, __DIR__ . '/uploads/' . $filename);
        imagedestroy($image);
        if (!$ok) throw new RuntimeException('Upload failed');
        json_response(201, ['url' => 'uploads/' . $filename]);
    } else {
        json_response(404, ['error' => 'Ruta no encontrada.']);
    }
    json_response(200, ['ok' => true]);
} catch (ValidationError $e) {
    try {
        if (db()->inTransaction()) db()->rollBack();
    } catch (Throwable $ignored) {
    }
    json_response(400, ['error' => $e->getMessage()]);
} catch (Throwable $e) {
    try {
        if (db()->inTransaction()) db()->rollBack();
    } catch (Throwable $ignored) {
    }
    error_log(
        'Mazmorra API: ' . get_class($e)
            . ' | ' . $e->getMessage()
            . ' | ' . basename($e->getFile())
            . ':' . $e->getLine()
    );
    json_response(500, ['error' => 'No se pudo completar la operación. Comprueba MySQL, app/config.php y la importación de database/schema.sql.']);
}
