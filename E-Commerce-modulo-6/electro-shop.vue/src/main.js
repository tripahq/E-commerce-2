import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { checkSession } from './store'

const app = createApp(App)

checkSession()
app.use(router)
app.mount('#app')