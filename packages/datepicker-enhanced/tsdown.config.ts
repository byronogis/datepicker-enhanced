import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  dts: { vue: true },
  exports: true,
  outputOptions: {
    name: 'DatePickerEnhanced',
    globals: {
      vue: 'Vue',
    },
  },
  format: ['esm', 'umd'],
  platform: 'neutral',
  plugins: [Vue({ isProduction: true })],
})
