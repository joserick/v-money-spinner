import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // If the mode is set to `doc`, we will build the documentation
  if (mode === 'doc') {
    return {
      plugins: [vue()],
      build: {
        entry: 'src/docs/index.ts',
        outDir: 'docs',
        base: 'src/docs/'
      }
    }
  }

  return {
    plugins: [vue()],
    build: {
      target: 'es2020',
      lib: {
        // Entry point for the library
        entry: 'src/index.ts',
        // Name of the library
        name: 'v-money-spinner',
        // File names for the `es` and `umd` build formats
        fileName: format => `v-money-spinner.${format}.js`
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue', 'v-money3'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
});
