import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            // ✅ 关键：指定入口
            entryRoot: 'src',

            // ✅ 输出到 dist
            outDir: 'dist',

            // ✅ 生成 index.d.ts
            insertTypesEntry: true,

            // ✅ 解决路径问题
            staticImport: true,

            rollupTypes: true,
        })
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'TransitionRouterView',
            fileName: 'index',
            formats: ["es"]
        },
        rollupOptions: {
            external: ['vue', 'vue-router'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                    'vue-router': 'VueRouter'
                }
            }
        },
        cssCodeSplit: false,
        emptyOutDir: true
    }
})