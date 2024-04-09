import { createApp } from 'vue'
import { createPinia } from 'pinia' 
import './style.css'
import App from './App.vue'

//we initialize the pinia store in the main.ts file
createApp(App).use(createPinia()).mount('#app')
