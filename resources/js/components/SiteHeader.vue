<script setup>
import { ref } from 'vue';
import AccountMenu from './AccountMenu.vue';

defineProps({ current: String });

const open = ref(false);
const links = [
  { page: 'catalogo', label: 'El catálogo' },
  { page: 'calendario', label: 'Calendario' },
  { page: 'encargos', label: 'Encargos' },
  { page: 'sobre-mi', label: 'Sobre mí' },
];
</script>

<template>
  <div class="preview">
    LA MAZMORRA DEL ROLEO <span>·</span> Aventuras y partidas · Atención directa con el autor
  </div>
  <header>
    <a class="brand" href="index.html">
      <span class="brand-icon">♜</span>
      <span>LA MAZMORRA<small>DEL ROLEO</small></span>
    </a>
    <button type="button" class="menu" :aria-expanded="open" aria-controls="nav" @click="open = !open">
      Menú ☰
    </button>
    <nav id="nav" :class="{ open }">
      <a v-for="{ page, label } in links" :key="page" :href="`${page}.html`"
        :aria-current="current === page ? 'page' : undefined">
        {{ label }}
      </a>
    </nav>
    <a class="header-cta" href="contacto.html">Hablemos <span>↗</span></a>
    <AccountMenu />
  </header>
</template>
