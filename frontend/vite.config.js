import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag === 'Section',
                },
            },
        }),
        vueDevTools(),
        tailwindcss(),
    ],
    server: {
        port: 3000,
        proxy: process.env.NODE_ENV === 'development' ? {
            '/api': {
                target: 'https://vue-app-backend.vercel.app/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        } : undefined,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});