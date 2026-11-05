<?php
// Copia este archivo como app/reservation-mail.php y completa los datos SMTP.
// No sustituyas app/config.php. No compartas el archivo con credenciales.
return [
    'enabled' => false,
    'host' => '',
    'port' => 587,
    'encryption' => 'tls', // tls: 587; ssl: 465, según tu proveedor.
    'username' => '',
    'password' => '',
    'from_email' => '',
    'from_name' => 'La Mazmorra del Roleo',
];
