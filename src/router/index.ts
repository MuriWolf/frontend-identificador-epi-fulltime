import Dashboard from '@/views/Dashboard.vue'
import AboutUs from '@/views/AboutUs.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/sobre-nos',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],

  //todo: redirecinar rotas inexistentes

})

export default router
