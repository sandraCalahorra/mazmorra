<template>
    <label :class="labelClass" :style="labelStyle">
        {{ label }}
        <input
            v-bind="modelValue == null ? $attrs : { ...$attrs, value: modelValue }"
            :class="[focusRing, tones[tone], controlSizes[size], variants[variant]]"
            :style="color ? { '--ui-color': color } : null"
            @input="updateValue"
        >
    </label>
</template>

<script>
import { appearanceProps, controlSizes, focusRing, tones, variants } from './BaseButton.vue';

export default {
    inheritAttrs: false,
    props: {
        ...appearanceProps,
        label: { type: String, required: true },
        labelClass: [String, Array, Object],
        labelStyle: [String, Array, Object],
        modelValue: [String, Number],
    },
    emits: ['update:modelValue'],
    data() {
        return { controlSizes, focusRing, tones, variants };
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
};
</script>
