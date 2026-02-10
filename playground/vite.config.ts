import UnoCSS from 'unocss/vite'
import vue from 'unplugin-vue/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  root: '.',
  base: `/datepicker-enhanced/`,
  plugins: [
    vue(),
    UnoCSS(),
    vueDevTools(),
  ],
})
