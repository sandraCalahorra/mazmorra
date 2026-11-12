<template>
    <SiteHeader />
    <main class="section detail-content account-page">
        <h1>Mi perfil</h1>
        <p id="user-status" role="status">{{ status }}</p>
        <a v-if="needsLogin" class="btn gold" href="acceso">Iniciar sesión</a>
        <form v-if="user" id="user-profile" @submit.prevent="submit">
            <label
            >Nombre o alias<input name="name" :value="user.name" maxlength="80" required /></label
            ><label>Correo<input name="email" :value="user.email" type="email" disabled /></label
            ><label
            >Contacto<input name="contact" :value="user.contact" maxlength="200" required
            /></label>
            <h3>Cambiar contraseña</h3>
            <p>Completa ambos campos si quieres cambiarla.</p>
            <label
            >Contraseña actual<input
                    name="current"
                    type="password"
                    autocomplete="current-password" /></label
            ><label
            >Nueva contraseña<input
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    minlength="12"
                    maxlength="72" /></label
            ><button class="btn gold" :disabled="busy">Guardar perfil</button>
        </form>
    </main>
    <footer>
        <a class="brand" href="./"
        ><span class="brand-icon">♜</span
        ><span>LA MAZMORRA<small>DEL ROLEO</small></span></a
        >
        <p>Historias que se leen. Aventuras que se viven.</p>
        <div>
            <button data-legal="legal">Información del sitio</button
            ><button data-legal="privacy">Privacidad</button>
        </div>
        <small
        >© 2026 La Mazmorra del Roleo. Proyecto independiente, no afiliado a
            Wizards of the Coast.</small
        ><a class="admin-access" href="admin">Administración</a>
    </footer>
    <dialog id="modal">
        <button class="close" aria-label="Cerrar ventana">×</button>
        <div id="modal-content"></div>
    </dialog>
</template>

<script>
import '../../../css/pages/mi-perfil.css';
import SiteHeader from '../shared/SiteHeader.vue';
import { accountForm } from '@/components/mixins/accountForm';

export const features = ["app", "animaciones"];
export const needsSiteData = true;

export default {
    components: { SiteHeader },
    mixins: [accountForm('profile')],
};
</script>
