import { createRouter, createWebHistory } from 'vue-router'
// 1. Importamos la vista principal (asegúrate de que el archivo exista en esa carpeta)
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 2. AQUÍ está la ruta "/" que Vue te estaba reclamando:
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // 3. Y aquí preparamos la ruta para el detalle del producto:
    {
      path: '/producto/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue')
    }
  ]
})

export default router