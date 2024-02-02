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
  },

  // Admin

  {
    path: '/Admin/:id',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/AposLogin/PastaAdmin/Admin.vue')
  },

  {
    path: '/DefinicoesAdmin/:id',
    name: 'DefinicoesAdmin',
    component: () => import(/* webpackChunkName: "DefinicoesAdmin" */ '../views/AposLogin/PastaAdmin/DefinicoesAdmin.vue')
  },

  // Catálogo

  {
    path: '/Sofas/:id',
    name: 'Sofas',
    component: () => import(/* webpackChunkName: "Sofas" */ '../views/AposLogin/Catalogo/Sofas.vue')
  },

  {
    path: '/Cadeiroes/:id',
    name: 'Cadeiroes',
    component: () => import(/* webpackChunkName: "Cadeiroes" */ '../views/AposLogin/Catalogo/Cadeiroes.vue')
  },

  {
    path: '/Consolas/:id',
    name: 'Consolas',
    component: () => import(/* webpackChunkName: "Consolas" */ '../views/AposLogin/Catalogo/Consolas.vue')
  },

  {
    path: '/PecasDecoracao/:id',
    name: 'PecasDecoracao',
    component: () => import(/* webpackChunkName: "PecasDecoracao" */ '../views/AposLogin/Catalogo/PecasDecoracao.vue')
  },

  {
    path: '/Cadeiras/:id',
    name: 'Cadeiras',
    component: () => import(/* webpackChunkName: "Cadeiras" */ '../views/AposLogin/Catalogo/Cadeiras.vue')
  },

  {
    path: '/Banquetas/:id',
    name: 'Banquetas',
    component: () => import(/* webpackChunkName: "Banquetas" */ '../views/AposLogin/Catalogo/Banquetas.vue')
  },

  {
    path: '/MesasCabeceira/:id',
    name: 'MesasCabeceira',
    component: () => import(/* webpackChunkName: "MesasCabeceira" */ '../views/AposLogin/Catalogo/MesasCabeceira.vue')
  },

  {
    path: '/Camas/:id',
    name: 'Camas',
    component: () => import(/* webpackChunkName: "Camas" */ '../views/AposLogin/Catalogo/Camas.vue')
  },

  {
    path: '/Comodas/:id',
    name: 'Comodas',
    component: () => import(/* webpackChunkName: "Comodas" */ '../views/AposLogin/Catalogo/Comodas.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
