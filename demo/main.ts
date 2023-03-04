import { createApp } from 'vue'
import DatePickerEnhanced from '../src/index'
import App from './App.vue'

const app = createApp(App)
app.component('DatePickerEnhanced', DatePickerEnhanced)
app.mount('#app')
