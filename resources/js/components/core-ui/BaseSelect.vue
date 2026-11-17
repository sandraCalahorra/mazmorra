<template>
    <select
        v-bind="$attrs"
        class="base-select focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ui-focus,var(--color-primary))]"
        @change="updateValue"
    ><slot /></select>
</template>

<script>
import { h, render } from 'vue';

const BaseSelect = {
    inheritAttrs: false,
    props: { modelValue: [String, Number, Array] },
    emits: ['update:modelValue'],
    mounted() { this.syncValue(); },
    updated() { this.syncValue(); },
    methods: {
        syncValue() {
            if (this.modelValue === undefined) return;
            if (this.$el.multiple && Array.isArray(this.modelValue)) {
                for (const option of this.$el.options) option.selected = this.modelValue.map(String).includes(option.value);
            } else {
                this.$el.value = this.modelValue;
            }
        },
        updateValue(event) {
            const select = event.target;
            this.$emit('update:modelValue', select.multiple
                ? Array.from(select.selectedOptions, option => option.value)
                : select.value);
        },
    },
};

export default BaseSelect;

// Los formularios anteriores a Vue necesitan un select nativo para sus listeners.
export function createBaseSelect(attributes = {}) {
    const host = document.createElement('div');
    render(h(BaseSelect, attributes), host);
    return host.removeChild(host.firstElementChild);
}

export function replaceBaseSelects(container) {
    for (const placeholder of container.querySelectorAll('base-select')) {
        const select = createBaseSelect();
        for (const { name, value } of placeholder.attributes) {
            if (name === 'class') select.classList.add(...placeholder.classList);
            else select.setAttribute(name, value);
        }
        select.append(...placeholder.childNodes);
        placeholder.replaceWith(select);
    }
}

// Conserva el select nativo para formularios y ofrece una lista visual propia.
let current = null;
let list = null;
let active = -1;
let entries = [];
let sequence = 0;

function close(restoreFocus = false) {
    if (!current) return;
    const select = current;
    select.setAttribute('aria-expanded', 'false');
    select.removeAttribute('aria-controls');
    select.removeAttribute('aria-activedescendant');
    list?.remove();
    current = null;
    list = null;
    entries = [];
    if (restoreFocus && select.isConnected) select.focus();
}
function position() {
    if (!current || !list) return;
    const rect = current.getBoundingClientRect();
    const gap = 5;
    const below = window.innerHeight - rect.bottom - gap;
    const above = rect.top - gap;
    const height = Math.max(80, Math.min(280, Math.max(below, above) - 8));
    list.style.maxHeight = `${height}px`;
    list.style.width = `${Math.min(rect.width, window.innerWidth - 16)}px`;
    list.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8))}px`;
    list.style.top = below < 180 && above > below ? 'auto' : `${rect.bottom + gap}px`;
    list.style.bottom = below < 180 && above > below ? `${window.innerHeight - rect.top + gap}px` : 'auto';
}
function highlight(index) {
    if (!entries.length) return;
    active = Math.max(0, Math.min(entries.length - 1, index));
    entries.forEach((entry, i) => entry.node.classList.toggle('is-active', i === active));
    current.setAttribute('aria-activedescendant', entries[active].node.id);
    entries[active].node.scrollIntoView({ block: 'nearest' });
}
function choose(index) {
    const entry = entries[index];
    if (!entry || !current) return;
    const select = current;
    if (select.selectedIndex !== entry.index) {
        select.selectedIndex = entry.index;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    close(true);
}
function open(select) {
    if (select.disabled || select.multiple || select.size > 1) return;
    if (current === select) { close(); return; }
    close();
    current = select;
    list = document.createElement('div');
    list.className = 'base-select-menu';
    list.id = `base-select-menu-${++sequence}`;
    list.setAttribute('role', 'listbox');
    const label = select.labels?.[0]?.textContent?.trim() || select.getAttribute('aria-label') || 'Opciones';
    list.setAttribute('aria-label', label);
    entries = [];
    let optionIndex = 0;
    function addOption(option, groupDisabled = false) {
        const index = optionIndex++;
        const node = document.createElement('div');
        node.className = 'base-select-option';
        node.id = `${list.id}-option-${index}`;
        node.setAttribute('role', 'option');
        node.setAttribute('aria-selected', String(option.selected));
        node.textContent = option.textContent;
        if (option.disabled || groupDisabled) {
            node.setAttribute('aria-disabled', 'true');
        } else {
            const entryIndex = entries.length;
            entries.push({ node, index });
            node.addEventListener('pointermove', () => highlight(entryIndex));
            node.addEventListener('click', () => choose(entryIndex));
        }
        list.append(node);
    }
    for (const child of select.children) {
        if (child.tagName === 'OPTGROUP') {
            const heading = document.createElement('div');
            heading.className = 'base-select-group';
            heading.textContent = child.label;
            list.append(heading);
            for (const option of child.children) if (option.tagName === 'OPTION') addOption(option, child.disabled);
        } else if (child.tagName === 'OPTION') addOption(child);
    }
    (select.closest('dialog[open]') || document.body).append(list);
    select.setAttribute('aria-expanded', 'true');
    select.setAttribute('aria-controls', list.id);
    position();
    highlight(Math.max(0, entries.findIndex(entry => entry.index === select.selectedIndex)));
}
document.addEventListener('pointerdown', event => {
    const select = event.target.closest?.('select.base-select');
    if (select && !select.disabled && !select.multiple && select.size <= 1) {
        event.preventDefault();
        select.focus();
        open(select);
    } else if (current && !list.contains(event.target)) close();
});
// Evita que el clic posterior al pointerdown abra también el menú nativo.
document.addEventListener('click', event => {
    const select = event.target.closest?.('select.base-select');
    if (select && !select.multiple && select.size <= 1) event.preventDefault();
});
document.addEventListener('keydown', event => {
    const select = event.target.closest?.('select.base-select');
    if (!select || select.disabled || select.multiple || select.size > 1) return;
    if (current !== select) {
        if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
            event.preventDefault(); open(select);
        }
        return;
    }
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    else if (event.key === 'Tab') close();
    else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); highlight(active + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault(); highlight(event.key === 'Home' ? 0 : entries.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); choose(active);
    }
});
window.addEventListener('resize', position);
document.addEventListener('scroll', event => { if (current && !list.contains(event.target)) position(); }, true);

</script>
