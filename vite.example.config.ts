import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    root: resolve(__dirname, 'example'),
    base: './',
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js'
        }
    },
    build: {
        outDir: resolve(__dirname, 'docs'),
        emptyOutDir: true
    },
    server: {
        port: 5174,
        open: true
    }
})
