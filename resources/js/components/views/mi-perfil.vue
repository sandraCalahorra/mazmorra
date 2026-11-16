<template>
    <SiteHeader />
    <main class="section detail-content account-page">
        <h1>Mi perfil</h1>
        <p id="user-status" role="status">{{ status }}</p>
        <a v-if="needsLogin" class="btn gold" href="acceso">Iniciar sesión</a>
        <form v-if="user" id="user-profile" @submit.prevent="submit">
            <BaseTextField label="Nombre o alias" name="name" :value="user.name" maxlength="80" required />
            <BaseTextField label="Correo" name="email" :value="user.email" type="email" disabled />
            <BaseTextField label="Contacto" name="contact" :value="user.contact" maxlength="200" required />
            <h3>Cambiar contraseña</h3>
            <p>Completa ambos campos si quieres cambiarla.</p>
            <BaseTextField
                label="Contraseña actual"
                name="current"
                type="password"
                autocomplete="current-password"
            />
            <BaseTextField
                label="Nueva contraseña"
                name="password"
                type="password"
                autocomplete="new-password"
                minlength="12"
                maxlength="72"
            />
            <BaseButton type="submit" class="btn gold" :disabled="busy">Guardar perfil</BaseButton>
        </form>
    </main>
    <footer>
        <a class="brand" href="./"
        ><span class="brand-icon">♜</span
        ><span>LA MAZMORRA<small>DEL ROLEO</small></span></a
        >
        <p>Historias que se leen. Aventuras que se viven.</p>
        <div>
            <BaseButton data-legal="legal">Información del sitio</BaseButton
            ><BaseButton data-legal="privacy">Privacidad</BaseButton>
        </div>
        <small
        >© 2026 La Mazmorra del Roleo. Proyecto independiente, no afiliado a
            Wizards of the Coast.</small
        ><a class="admin-access" href="admin">Administración</a>
    </footer>
    <dialog id="modal">
        <BaseButton class="close" aria-label="Cerrar ventana">×</BaseButton>
        <div id="modal-content"></div>
    </dialog>
</template>

<script>
import '../../../css/pages/mi-perfil.css';
import BaseButton from '../core-ui/BaseButton.vue';
import BaseTextField from '../core-ui/BaseTextField.vue';
import SiteHeader from '../shared/SiteHeader.vue';
import { accountForm } from '@/components/mixins/accountForm';

export const features = ["app", "animaciones"];
export const needsSiteData = true;

export default {
    components: { BaseButton, BaseTextField, SiteHeader },
    mixins: [accountForm('profile')],
};
</script>
