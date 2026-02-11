import {
  defineConfig,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  outputToCssLayers: {
    cssLayerName(layer) {
      return layer === 'default'
        ? null
        : `uno.${layer}`
    },
  },
  shortcutsLayer: 'default',
  presets: [
    presetWind4(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
