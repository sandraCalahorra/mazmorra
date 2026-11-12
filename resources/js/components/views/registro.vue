<template>
    <SiteHeader />
    <main class="section detail-content account-page">
        <h1>Crear una cuenta</h1>
        <p id="user-status" role="status">{{ status }}</p>
        <form id="user-register" @submit.prevent="submit">
            <label
            >Nombre o alias<input
                    name="name"
                    maxlength="80"
                    autocomplete="nickname"
                    required /></label
            ><label
            >Correo<input
                    name="email"
                    type="email"
                    autocomplete="username"
                    maxlength="200"
                    required /></label
            ><label
            >Contacto para tus reservas<input
                    name="contact"
                    maxlength="200"
                    required /></label
            ><label
            >Contraseña (mínimo 12 caracteres)<input
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    minlength="12"
                    maxlength="72"
                    required /></label
            ><label
            ><input name="consent" type="checkbox" required /> Acepto que se
                guarden mis datos para gestionar mi cuenta y mis reservas. Consulta la
                información de privacidad al pie de la página.</label
            ><button class="btn gold" :disabled="busy">Registrarme</button>
        </form>
        <p><a href="acceso">Ya tengo cuenta</a></p>
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
import '../../../css/pages/registro.css';
import SiteHeader from '../shared/SiteHeader.vue';
import { accountForm } from '@/components/mixins/accountForm';

export const features = ["app", "animaciones"];
export const needsSiteData = true;

export default {
    components: { SiteHeader },
    mixins: [accountForm('register')],
};
</script>
