import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/docs/**']
    })
  ],
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/index.ts',
      name: 'v-money-spinner',
      fileName: format => `v-money-spinner.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'v-money3'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'v-money3': 'v-money3'
        }
      }
    }
  }
})
