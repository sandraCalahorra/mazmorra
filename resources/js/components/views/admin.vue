<template>
    <header>
        <a class="brand" href="./"
        >♜ LA MAZMORRA <small>ADMINISTRACIÓN</small></a
        ><a class="btn outline" href="./" target="_blank" rel="noopener"
        >Ver web ↗</a
        ><BaseButton id="logout" class="btn gold" hidden>Cerrar sesión</BaseButton>
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
                ><BaseButton type="submit" class="btn gold">Entrar</BaseButton>
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
                <BaseButton id="refresh" class="btn outline">Actualizar datos</BaseButton>
            </div>
            <div class="admin-stats" id="stats"></div>
            <nav class="admin-tabs" aria-label="Secciones del administrador">
                <BaseButton data-tab="commissioned">
                    Partidas por encargo
                </BaseButton>
                <BaseButton data-tab="products" class="active">Publicaciones</BaseButton
                >
                <BaseButton data-tab="agenda">Disponibilidad</BaseButton><BaseButton data-tab="games">Partidas</BaseButton
                ><BaseButton data-tab="reservations">Reservas</BaseButton
                ><BaseButton data-tab="shipping">Envíos</BaseButton><BaseButton data-tab="settings">Configuración</BaseButton>
            </nav>
            <div id="panel"></div>
        </section>
    </main>
    <dialog id="editor">
        <BaseButton class="close" aria-label="Cerrar editor">×</BaseButton>
        <div id="editor-body"></div>
    </dialog>
</template>

<script>
import BaseButton from '../core-ui/BaseButton.vue';
import '../../../css/pages/admin.css';

export const features = ["admin", "admin-visual", "admin-fondos", "admin-eliminar-solicitudes"];
export const needsSiteData = false;

export default { components: { BaseButton } };
</script>
