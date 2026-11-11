# La Mazmorra del Roleo

Vue 3, Tailwind CSS 4 y Axios en el navegador. Laravel 11 y MySQL o MariaDB en el servidor. Vite compila el frontend.

## Arranque local

Necesitas PHP 8.2 o superior con `pdo_mysql` y `mbstring`, Composer, Node.js 20 o superior y MySQL o MariaDB. Activa GD en PHP para subir portadas desde el panel.

Desde PowerShell, en la raíz del proyecto:

```powershell
composer install
npm ci
Copy-Item .env.example .env
php artisan key:generate
```

Crea una base MySQL vacía para una instalación nueva. Configura la conexión en `.env` con `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME` y `DB_PASSWORD`. Para una instalación existente, sigue los pasos del siguiente apartado.

```powershell
php artisan migrate
php artisan mazmorra:admin
npm run build
php artisan serve --host=127.0.0.1 --port=8000
```

Crea el administrador una sola vez. Abre [la web local](http://127.0.0.1:8000) y entra en [el panel](http://127.0.0.1:8000/admin). Para desarrollar el frontend, ejecuta `npm run dev` en otra terminal y abre la URL de Laravel. `APP_URL` debe coincidir con la dirección que usas, incluido el puerto.

## Actualizar una instalación existente

1. Haz una copia de la base de datos y de las imágenes subidas.
2. Copia las credenciales de `app/config.php` a las variables `DB_*` de `.env` y configura `APP_URL` con la dirección de la web.
3. Ejecuta `php artisan migrate` sobre esa base. Laravel ejecuta un archivo por tabla, crea las tablas y columnas que falten y conserva los registros, hashes de contraseñas y configuración existentes. Si el proceso se interrumpe, vuelve a ejecutar el mismo comando.
4. Copia las imágenes subidas de la instalación anterior a `public/uploads/`. Conserva `app/reservation-mail.php` si ya configuraste el correo de rechazos.
5. Ejecuta `npm run build` y vuelve a iniciar sesión. Laravel usa una nueva cookie de sesión.

Las rutas de página anteriores, como `catalogo.html`, siguen disponibles. `/recursos.html` redirige al catálogo. Las peticiones del navegador usan las rutas JSON bajo `/api`.

## Servidor web

En Apache/XAMPP configura el directorio público en `public/` y permite las reglas de `public/.htaccess` mediante `mod_rewrite` y `AllowOverride All`. Da permisos de escritura a PHP en `storage/`, `bootstrap/cache/` y `public/uploads/`. Configura `APP_ENV=production`, `APP_DEBUG=false` y la URL HTTPS en `APP_URL`.

`php artisan route:list --path=api` muestra los endpoints. `php tools/comprobar.php` comprueba la conexión y los bloqueos de MySQL con una transacción que se revierte al terminar.

## Estructura

- `resources/js/pages/` contiene las páginas Vue y `resources/js/components/` los componentes compartidos.
- `resources/js/api.js` configura Axios. `resources/js/features/` contiene los módulos del catálogo, el calendario y la administración.
- `resources/css/app.css` carga Tailwind y `resources/css/site/` contiene los estilos propios de la web. Vite compila ambos.
- `routes/web.php` y `app/Http/` contienen las rutas, los controladores y la protección de la API.
- `database/migrations/` define el esquema MySQL con un archivo Laravel por tabla. Estas migraciones también adoptan tablas existentes. `php artisan migrate:refresh` borra y vuelve a crear esas tablas, incluidas las adoptadas y sus datos.
