import type { App } from 'vue'
import MyComponent from './MyComponent.vue'

function install(app: App) {
  app.component('MyComponent', MyComponent)
}

export default {
  install,
}
