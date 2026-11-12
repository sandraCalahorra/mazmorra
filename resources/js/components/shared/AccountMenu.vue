<template>
    <div id="user-menu">
        <a v-if="unavailable" href="acceso">Acceso de usuarios</a>
        <details v-else-if="account?.user || account?.admin" class="account-menu">
            <summary>{{ account.user?.name || 'Administrador' }} ▾</summary>
            <div>
                <template v-if="account.user">
                    <a href="mis-partidas">Mis partidas</a>
                    <a href="mi-perfil">Mi perfil</a>
                </template>
                <a v-if="account.admin" href="admin">Administración</a>
                <button type="button" :disabled="busy" @click="logout">Cerrar sesión</button>
                <p v-if="error" role="alert">{{ error }}</p>
            </div>
        </details>
        <template v-else-if="account">
            <a href="acceso">Iniciar sesión</a>
            <a href="registro">Registrarse</a>
        </template>
    </div>
</template>

<script>
import { account, loadAccount, updateAccount } from '@/store/modules/account';
import { apiError } from '@/bootstrap';

export default {
    data() {
        return {
            unavailable: false,
            busy: false,
            error: '',
        };
    },

    computed: {
        account() {
            return account.value;
        },
    },

    async mounted() {
        try {
            await loadAccount();
        } catch {
            this.unavailable = true;
        }
    },

    methods: {
        async logout() {
            this.busy = true;
            this.error = '';
            try {
                await updateAccount('logout');
                location.assign('./');
            } catch (failure) {
                this.error = apiError(failure, 'No se ha podido cerrar la sesión.');
                this.busy = false;
            }
        },
    },
};
</script>
