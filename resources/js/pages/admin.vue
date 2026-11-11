<script>
import '../../css/pages/admin.css';

export const features = ["admin", "admin-visual", "admin-fondos", "admin-eliminar-solicitudes"];
export const needsSiteData = false;
</script>

<template>
    <header>
      <a class="brand" href="index.html"
        >♜ LA MAZMORRA <small>ADMINISTRACIÓN</small></a
      ><a class="btn outline" href="index.html" target="_blank" rel="noopener"
        >Ver web ↗</a
      ><button id="logout" class="btn gold" hidden>Cerrar sesión</button>
    </header>
    <main class="admin-shell">
      <div id="alert" role="status"></div>
      <section id="login">
        <p class="eyebrow">ACCESO DEL PROPIETARIO</p>
        <h1>Tu mesa de trabajo.</h1>
        <p>Gestiona tus publicaciones y las próximas partidas.</p>
        <form id="login-form">
          <label
            >Usuario<input
              name="username"
              required
              autocomplete="username" /></label
          ><label
            >Contraseña<input
              name="password"
              type="password"
              required
              autocomplete="current-password" /></label
          ><button class="btn gold">Entrar</button>
        </form>
        <p class="small">
          Primera vez. Tras ejecutar las migraciones, crea el acceso desde
          la terminal con <code>php artisan mazmorra:admin</code>.
        </p>
      </section>
      <section id="dashboard" hidden>
        <div class="admin-title">
          <div>
            <p class="eyebrow">LA MAZMORRA DEL ROLEO</p>
            <h1>Administración</h1>
          </div>
          <button id="refresh" class="btn outline">Actualizar datos</button>
        </div>
        <div class="admin-stats" id="stats"></div>
        <nav class="admin-tabs" aria-label="Secciones del administrador">
          <button type="button" data-tab="commissioned">
            Partidas por encargo
          </button>
          <button data-tab="products" class="active">Publicaciones</button
          >
          <button type="button" data-tab="agenda">Disponibilidad</button><button data-tab="games">Partidas</button
          ><button data-tab="reservations">Reservas</button
          ><button type="button" data-tab="shipping">Envíos</button><button data-tab="settings">Configuración</button>
        </nav>
        <div id="panel"></div>
      </section>
    </main>
    <dialog id="editor">
      <button class="close" aria-label="Cerrar editor">×</button>
      <div id="editor-body"></div>
    </dialog>
</template>
