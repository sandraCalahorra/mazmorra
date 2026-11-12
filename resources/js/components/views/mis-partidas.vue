<template>
    <SiteHeader />
    <main class="section detail-content account-page">
        <h1>Mis partidas</h1>
        <AccountGames />
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
import '../../../css/pages/mis-partidas.css';
import AccountGames from '../shared/AccountGames.vue';
import SiteHeader from '../shared/SiteHeader.vue';

export const features = ["app", "animaciones"];
export const needsSiteData = true;

export default {
    components: { AccountGames, SiteHeader },
};
</script>
