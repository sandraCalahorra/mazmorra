<template>
    <SiteHeader />
    <main class="section detail-content account-page">
        <h1>Crear una cuenta</h1>
        <p id="user-status" role="status">{{ status }}</p>
        <form id="user-register" @submit.prevent="submit">
            <BaseTextField label="Nombre o alias" name="name" maxlength="80" autocomplete="nickname" required />
            <BaseTextField label="Correo" name="email" type="email" autocomplete="username" maxlength="200" required />
            <BaseTextField label="Contacto para tus reservas" name="contact" maxlength="200" required />
            <BaseTextField
                label="Contraseña (mínimo 12 caracteres)"
                name="password"
                type="password"
                autocomplete="new-password"
                minlength="12"
                maxlength="72"
                required
            />
            <BaseCheckbox name="consent" required>
                Acepto que se
                guarden mis datos para gestionar mi cuenta y mis reservas. Consulta la
                información de privacidad al pie de la página.
            </BaseCheckbox>
            <BaseButton type="submit" class="btn gold" :disabled="busy">Registrarme</BaseButton>
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
import '../../../css/pages/registro.css';
import BaseButton from '../core-ui/BaseButton.vue';
import BaseCheckbox from '../core-ui/BaseCheckbox.vue';
import BaseTextField from '../core-ui/BaseTextField.vue';
import SiteHeader from '../shared/SiteHeader.vue';
import { accountForm } from '@/components/mixins/accountForm';

export const features = ["app", "animaciones"];
export const needsSiteData = true;

export default {
    components: { BaseButton, BaseCheckbox, BaseTextField, SiteHeader },
    mixins: [accountForm('register')],
};
</script>
