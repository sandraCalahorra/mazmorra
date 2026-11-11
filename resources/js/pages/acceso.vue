<script>
import '../../css/pages/acceso.css';

export const features = ["app", "animaciones"];
export const needsSiteData = true;
</script>

<script setup>
import SiteHeader from '../components/SiteHeader.vue';
import { useAccountForm } from '../useAccountForm';

const { busy, status, submit } = useAccountForm('login');
</script>

<template>
    <SiteHeader />
    <main class="section detail-content account-page">
      <h1>Iniciar sesión</h1>
      <p id="user-status" role="status">{{ status }}</p>
      <p>Accede para consultar tus partidas y tu perfil.</p>
      <form id="user-login" @submit.prevent="submit">
        <label
          >Correo<input
            name="email"
            type="email"
            autocomplete="username"
            required /></label
        ><label
          >Contraseña<input
            name="password"
            type="password"
            autocomplete="current-password"
            required /></label
        ><button class="btn gold" :disabled="busy">Iniciar sesión</button>
      </form>
      <p><a href="registro.html">Crear una cuenta</a></p>
      <p>
        Si has olvidado tu contraseña, contacta con el autor. La recuperación
        automática por correo todavía no está disponible.
      </p>
    </main>
    <footer class="site-footer">
  <div class="site-footer__main">
    <div class="site-footer__brand">
      <a class="brand" href="index.html">
        <span class="brand-icon" aria-hidden="true">♜</span>
        <span>LA MAZMORRA<small>DEL ROLEO</small></span>
      </a>

      <p>
        Historias que se leen.<br>
        Aventuras que se viven.
      </p>

      <a
        class="site-footer__contact"
        href="https://wa.me/34666530043"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hablemos por WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </div>

    <nav class="site-footer__column" aria-label="Enlaces del pie de página">
      <h2>Explora la mazmorra</h2>
      <a href="catalogo.html">Aventuras y libros</a>
      <a href="calendario.html">Reserva tu partida</a>
      <a href="encargos.html">Aventuras por encargo</a>
      <a href="sobre-mi.html">Conoce al máster</a>
      <a href="contacto.html">Contacto</a>
    </nav>

    <div class="site-footer__column">
      <h2>Más allá de la mesa</h2>

      <a
        href="https://www.instagram.com/la_mazmorra_del_roleo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram <span aria-hidden="true">↗</span>
      </a>

      <a
        href="https://mesasroleras.com/gm/osoliron411"
        target="_blank"
        rel="noopener noreferrer"
      >
        Mesas Roleras <span aria-hidden="true">↗</span>
      </a>

      <a
        href="https://linktr.ee/Osoliron411"
        target="_blank"
        rel="noopener noreferrer"
      >
        Todos mis enlaces · Linktree <span aria-hidden="true">↗</span>
      </a>

      <a class="site-footer__email" href="mailto:lamazmorradelroleo@gmail.com">
        lamazmorradelroleo@gmail.com
      </a>
    </div>
  </div>

  <div class="site-footer__bottom">
    <p>
      © 2026 La Mazmorra del Roleo.
      <span>Proyecto independiente, no afiliado a Wizards of the Coast.</span>
    </p>

    <div class="site-footer__legal">
      <button type="button" data-legal="legal">Información del sitio</button>
      <button type="button" data-legal="privacy">Privacidad</button>
      <a href="admin.html">Administración</a>
    </div>
  </div>
</footer>
    <dialog id="modal">
      <button class="close" aria-label="Cerrar ventana">×</button>
      <div id="modal-content"></div>
    </dialog>
</template>
