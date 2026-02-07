import { playwright } from '@vitest/browser-playwright'
import vue from 'unplugin-vue/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {},
  },
  test: {
    root: '.',
    include: ['packages/datepicker-enhanced/tests/**/*.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
  },
})
