<template>
    <label
        :class="[
            textSizes[size],
            tones[tone],
            variants[variant],
            variant && 'p-[var(--ui-padding,0.375rem_0.625rem)]',
            labelClass,
        ]"
        :style="[labelStyle, color ? { '--ui-color': color } : null]"
    >
        <input
            v-bind="modelValue === undefined ? $attrs : { ...$attrs, checked: modelValue }"
            class="accent-[var(--ui-accent,var(--ui-color,var(--ui-tone,auto)))]"
            :class="[checkboxSizes[size], focusRing]"
            type="checkbox"
            @change="updateChecked"
        >
        <slot />
    </label>
</template>

<script>
import { h, render } from 'vue';
import { appearanceProps, checkboxSizes, focusRing, setHtmlWithBaseButtons, textSizes, tones, variants } from './BaseButton.vue';

const BaseCheckbox = {
    inheritAttrs: false,
    props: {
        ...appearanceProps,
        labelClass: [String, Array, Object],
        labelStyle: [String, Array, Object],
        modelValue: { type: Boolean, default: undefined },
    },
    emits: ['update:modelValue'],
    data() {
        return { checkboxSizes, focusRing, textSizes, tones, variants };
    },
    methods: {
        updateChecked(event) {
            this.$emit('update:modelValue', event.target.checked);
        },
    },
};

export default BaseCheckbox;

export function setHtmlWithBaseCheckboxes(container, html) {
    setHtmlWithBaseButtons(container, html);

    for (const placeholder of container.querySelectorAll('base-checkbox')) {
        const host = document.createElement('div');
        render(h(BaseCheckbox, { labelClass: placeholder.getAttribute('label-class') }), host);

        const label = host.firstElementChild;
        const input = label.querySelector('input');
        for (const { name, value } of placeholder.attributes) {
            if (name === 'label-class') continue;
            if (name.startsWith('label-')) {
                label.setAttribute(name.slice('label-'.length), value);
            } else {
                input.setAttribute(name, value);
            }
        }
        label.append(...placeholder.childNodes);
        placeholder.replaceWith(label);
    }
}
</script>
