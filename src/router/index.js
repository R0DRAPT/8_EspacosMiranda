import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Contactos',
    name: 'Contactos',
    component: () => import(/* webpackChunkName: "Contactos" */ '../views/Contactos.vue')
  },

  // Apos Login

  {
    path: '/HomeAposLogin/:id',
    name: 'HomeAposLogin',
    component: () => import(/* webpackChunkName: "HomeAposLogin" */ '../views/AposLogin/HomeAposLogin.vue')
  },
  {
    path: '/ContactosAposLogin/:id',
    name: 'ContactosAposLogin',
    component: () => import(/* webpackChunkName: "ContactosAposLogin" */ '../views/AposLogin/ContactosAposLogin.vue')
  },
  {
    path: '/Definicoes/:id',
    name: 'Definicoes',
    component: () => import(/* webpackChunkName: "Definicoes" */ '../views/AposLogin/Definicoes.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
