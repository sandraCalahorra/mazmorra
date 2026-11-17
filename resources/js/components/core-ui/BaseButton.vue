<template>
    <button
        :class="[
            focusRing,
            tones[tone],
            controlSizes[size],
            variants[variant],
            variant && 'enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60',
            variant && !size && 'p-[var(--ui-padding,0.5rem_0.75rem)]',
        ]"
        :type="type"
        :style="color ? { '--ui-color': color } : null"
    >
        <slot />
    </button>
</template>

<script>
import { h, render } from 'vue';
import { replaceBaseSelects } from './BaseSelect.vue';

const textSizes = {
    sm: 'text-[length:var(--ui-font-size,var(--text-control-sm))]',
    md: 'text-[length:var(--ui-font-size,var(--text-control-md))]',
    lg: 'text-[length:var(--ui-font-size,var(--text-control-lg))]',
};

export const controlSizes = {
    sm: [textSizes.sm, 'min-h-[var(--ui-height,var(--spacing-control-sm))] p-[var(--ui-padding,0_0.5rem)]'],
    md: [textSizes.md, 'min-h-[var(--ui-height,var(--spacing-control-md))] p-[var(--ui-padding,0_0.75rem)]'],
    lg: [textSizes.lg, 'min-h-[var(--ui-height,var(--spacing-control-lg))] p-[var(--ui-padding,0_1rem)]'],
};

export { textSizes };

export const checkboxSizes = {
    sm: 'size-[var(--ui-checkbox-size,var(--spacing-checkbox-sm))]',
    md: 'size-[var(--ui-checkbox-size,var(--spacing-checkbox-md))]',
    lg: 'size-[var(--ui-checkbox-size,var(--spacing-checkbox-lg))]',
};

export const tones = {
    primary: '[--ui-tone:var(--color-primary)] [--ui-tone-contrast:#19231d]',
    'primary-dark': '[--ui-tone:var(--color-primary-dark)] [--ui-tone-contrast:var(--color-primary-light)]',
    'primary-light': '[--ui-tone:var(--color-primary-light)] [--ui-tone-contrast:var(--color-primary-dark)]',
    neutral: '[--ui-tone:#eee9dd] [--ui-tone-contrast:#19231d]',
    success: '[--ui-tone:#a3d5ac] [--ui-tone-contrast:#17271c]',
    danger: '[--ui-tone:#f0a49e] [--ui-tone-contrast:#331a18]',
};
tones.gold = tones.primary;

const variantBase = 'rounded-[var(--ui-radius,0.375rem)] border border-solid';
const tintedText = 'text-[color:var(--ui-text,var(--ui-color,var(--ui-tone,var(--color-primary))))]';

export const variants = {
    solid: [
        variantBase,
        'bg-[var(--ui-background,var(--ui-color,var(--ui-tone,var(--color-primary))))]',
        'text-[color:var(--ui-text,var(--ui-tone-contrast,#19231d))]',
        'border-[color:var(--ui-border,transparent)]',
    ],
    outline: [
        variantBase,
        tintedText,
        'bg-[var(--ui-background,transparent)] border-[color:var(--ui-border,currentColor)]',
    ],
    ghost: [
        variantBase,
        tintedText,
        'bg-[var(--ui-background,transparent)] border-[color:var(--ui-border,transparent)]',
    ],
};

export const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ui-focus,var(--ui-color,var(--ui-tone,var(--color-primary))))]';

export const appearanceProps = {
    size: {
        type: String,
        validator: (value) => Object.hasOwn(controlSizes, value),
    },
    tone: {
        type: String,
        validator: (value) => Object.hasOwn(tones, value),
    },
    variant: {
        type: String,
        validator: (value) => Object.hasOwn(variants, value),
    },
    color: String,
};

const BaseButton = {
    props: {
        ...appearanceProps,
        type: {
            type: String,
            default: 'button',
        },
    },
    data() {
        return { controlSizes, focusRing, tones, variants };
    },
};

export default BaseButton;

// Some views generate buttons from HTML and hydrate those nodes again.
export function createBaseButton(props, text) {
    const container = document.createElement('div');
    render(h(BaseButton, props), container);
    const button = container.removeChild(container.firstElementChild);
    if (text !== undefined) button.textContent = text;
    return button;
}

export function setHtmlWithBaseButtons(container, html) {
    container.innerHTML = html;
    replaceBaseSelects(container);

    for (const placeholder of container.querySelectorAll('base-button')) {
        const button = createBaseButton({
            class: placeholder.className,
            type: placeholder.getAttribute('type') ?? undefined,
        });
        for (const { name, value } of placeholder.attributes) {
            if (name !== 'class' && name !== 'type') button.setAttribute(name, value);
        }
        button.append(...placeholder.childNodes);
        placeholder.replaceWith(button);
    }
}
</script>
