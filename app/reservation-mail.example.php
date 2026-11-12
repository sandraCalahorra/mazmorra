<?php
// Copia este archivo como app/reservation-mail.php y completa los datos SMTP.
// Conserva las credenciales en reservation-mail.php.
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
