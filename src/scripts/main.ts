import { createApp } from 'vue'
import { createPinia } from 'pinia' 
import router from '../router'
import '../style.css'
import App from '../App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

//we initialize the pinia store in the main.ts file
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
