import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <-- Esto conecta las rutas

const app = createApp(App)

app.use(router) // <-- Le decimos a Vue que use el enrutador
app.mount('#app')