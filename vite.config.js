import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    laravel({ input: ['resources/js/main.js'], refresh: true }),
    vue({ template: { transformAssetUrls: false } }),
    tailwindcss(),
  ],
  build: { assetsInlineLimit: 0 },
});
