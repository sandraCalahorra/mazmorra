<script setup>
import filledPaths from '../../assets/fluent/filled.js';

defineProps({
    name: { type: String, required: true },
});
</script>

<template>
    <svg class="fluent-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <path v-for="path in filledPaths[name]" :key="path" :d="path" />
    </svg>
</template>

<style scoped>
.fluent-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    flex: none;
    vertical-align: -0.125em;
    fill: currentColor;
}
</style>
