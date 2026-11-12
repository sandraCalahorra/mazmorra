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
php artisan migrate --seed
php artisan mazmorra:admin
npm run build
php artisan serve --host=127.0.0.1 --port=8000
```

Puedes ejecutar `php artisan db:seed` para cargar la configuración y los productos iniciales que falten. Los seeders conservan los registros que ya existen. Crea el administrador una sola vez con `php artisan mazmorra:admin`.

Abre [la web local](http://127.0.0.1:8000) y entra en [el panel](http://127.0.0.1:8000/admin). Para desarrollar el frontend, ejecuta `npm run dev` en otra terminal y abre la URL de Laravel. `APP_URL` debe coincidir con la dirección que usas, incluido el puerto.

## Actualizar una instalación existente

1. Haz una copia de la base de datos y de las imágenes subidas.
2. Copia las credenciales de `app/config.php` a las variables `DB_*` de `.env` y configura `APP_URL` con la dirección de la web.
3. Ejecuta `php artisan migrate` sobre esa base. Laravel ejecuta un archivo por tabla, crea las tablas y columnas que falten y conserva los registros, hashes de contraseñas y configuración existentes. Si el proceso se interrumpe, vuelve a ejecutar el mismo comando.
4. Copia las imágenes subidas de la instalación anterior a `public/uploads/`. Conserva `app/reservation-mail.php` si ya configuraste el correo de rechazos.
5. Ejecuta `npm run build` y vuelve a iniciar sesión. Laravel usa una nueva cookie de sesión.

Las páginas usan URL como `/catalogo` y `/calendario`. Los enlaces antiguos con `.html` redirigen a la URL actual, y `/recursos` redirige al catálogo. Las peticiones del navegador usan las rutas JSON bajo `/api`.

Si actualizas una copia que ya usa Laravel, ejecuta `composer install`, `php artisan route:clear` y `npm run build` para cargar la nueva estructura. Si usas caché de rutas en producción, vuelve a generarla con `php artisan route:cache`.

## Servidor web

En Apache/XAMPP configura el directorio público en `public/` y permite las reglas de `public/.htaccess` mediante `mod_rewrite` y `AllowOverride All`. Da permisos de escritura a PHP en `storage/`, `bootstrap/cache/` y `public/uploads/`. Configura `APP_ENV=production`, `APP_DEBUG=false` y la URL HTTPS en `APP_URL`.

`php artisan route:list --path=api` muestra los endpoints. `php tools/comprobar.php` comprueba la conexión y los bloqueos de MySQL con una transacción que se revierte al terminar.

## Estructura

- `resources/js/app.js` arranca Vue desde `resources/views/site.blade.php`. Laravel resuelve la URL y `resources/js/router/` carga la vista correspondiente desde `resources/js/components/views/`. Los componentes reutilizables están en `resources/js/components/shared/`.
- Los componentes Vue usan la Options API: `data` para el estado local, `computed` para los valores derivados, `mounted` para la inicialización y `methods` para las acciones. La lógica de los formularios de cuenta se comparte en `resources/js/components/mixins/accountForm.js`.
- `resources/js/bootstrap.js` configura Axios. `resources/js/store/modules/` reúne el estado compartido de la cuenta y del sitio, y `resources/js/features/` contiene las interacciones del catálogo, el calendario y la administración.
- `resources/css/app.css` carga Tailwind. Los estilos del sitio están en `resources/css/pages/` y `resources/css/site/`.
- `routes/web.php` sirve las páginas y `routes/api.php` define los endpoints JSON. Ambos usan el grupo web de Laravel; los endpoints públicos de lectura que no necesitan sesión la omiten.
- `app/Http/Controllers/` separa las operaciones de catálogo, agenda, reservas, encargos, envíos y administración. `app/Services/` agrupa la lógica de negocio compartida y `app/Mail/` el envío de avisos.
- `database/migrations/` define el esquema MySQL con un archivo Laravel por tabla. Estas migraciones también adoptan tablas existentes. `php artisan migrate:refresh` borra y vuelve a crear esas tablas, incluidas las adoptadas y sus datos.
