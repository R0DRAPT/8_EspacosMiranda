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

  // CatálogoAdmin

  {
    path: '/SofasAdmin/:id',
    name: 'SofasAdmin',
    component: () => import(/* webpackChunkName: "SofasAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/SofasAdmin.vue')
  },

  {
    path: '/CadeiroesAdmin/:id',
    name: 'CadeiroesAdmin',
    component: () => import(/* webpackChunkName: "CadeiroesAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/CadeiroesAdmin.vue')
  },

  {
    path: '/ConsolasAdmin/:id',
    name: 'ConsolasAdmin',
    component: () => import(/* webpackChunkName: "ConsolasAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/ConsolasAdmin.vue')
  },

  {
    path: '/PecasDecoracaoAdmin/:id',
    name: 'PecasDecoracaoAdmin',
    component: () => import(/* webpackChunkName: "PecasDecoracaoAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/PecasDecoracaoAdmin.vue')
  },

  {
    path: '/CadeirasAdmin/:id',
    name: 'CadeirasAdmin',
    component: () => import(/* webpackChunkName: "CadeirasAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/CadeirasAdmin.vue')
  },

  {
    path: '/BanquetasAdmin/:id',
    name: 'BanquetasAdmin',
    component: () => import(/* webpackChunkName: "BanquetasAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/BanquetasAdmin.vue')
  },

  {
    path: '/MesasCabeceiraAdmin/:id',
    name: 'MesasCabeceiraAdmin',
    component: () => import(/* webpackChunkName: "MesasCabeceiraAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/MesasCabeceiraAdmin.vue')
  },

  {
    path: '/CamasAdmin/:id',
    name: 'CamasAdmin',
    component: () => import(/* webpackChunkName: "CamasAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/CamasAdmin.vue')
  },

  {
    path: '/MesasAdmin/:id',
    name: 'MesasAdmin',
    component: () => import(/* webpackChunkName: "MesasAdmin" */ '../views/AposLogin/PastaAdmin/CatalogoAdmin/MesasAdmin.vue')
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
    path: '/Mesas/:id',
    name: 'Mesas',
    component: () => import(/* webpackChunkName: "Mesas" */ '../views/AposLogin/Catalogo/Mesas.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
