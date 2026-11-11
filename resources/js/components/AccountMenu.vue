<script setup>
import { onMounted, ref } from 'vue';
import { account, loadAccount, updateAccount } from '../account';
import { apiError } from '../api';

const unavailable = ref(false);
const busy = ref(false);
const error = ref('');

onMounted(() => loadAccount().catch(() => { unavailable.value = true; }));

async function logout() {
  busy.value = true;
  error.value = '';
  try {
    await updateAccount('logout');
    location.assign('index.html');
  } catch (failure) {
    error.value = apiError(failure, 'No se ha podido cerrar la sesión.');
    busy.value = false;
  }
}
</script>

<template>
  <div id="user-menu">
    <a v-if="unavailable" href="acceso.html">Acceso de usuarios</a>
    <details v-else-if="account?.user || account?.admin" class="account-menu">
      <summary>{{ account.user?.name || 'Administrador' }} ▾</summary>
      <div>
        <template v-if="account.user">
          <a href="mis-partidas.html">Mis partidas</a>
          <a href="mi-perfil.html">Mi perfil</a>
        </template>
        <a v-if="account.admin" href="admin.html">Administración</a>
        <button type="button" :disabled="busy" @click="logout">Cerrar sesión</button>
        <p v-if="error" role="alert">{{ error }}</p>
      </div>
    </details>
    <template v-else-if="account">
      <a href="acceso.html">Iniciar sesión</a>
      <a href="registro.html">Registrarse</a>
    </template>
  </div>
</template>
