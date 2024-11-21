import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [vue()],
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_OPTIONS_API__: 'true',
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@vue-use-x/modal': resolve(__dirname, '../../packages/modal/src'),
      '@vue-use-x/common': resolve(__dirname, '../../packages/common/src'),
    },

  },
})
