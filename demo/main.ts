import { createApp } from 'vue'
import MyComponent from '../src/index'
import App from './App.vue'

createApp(App).use(MyComponent).mount('#app')
