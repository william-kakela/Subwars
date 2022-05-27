import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news" */ '../views/NewsView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/tournaments',
    name: 'tournaments',
    component: () => import(/* webpackChunkName: "tournaments" */ '../views/TournamentsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/tournament-create',
    name: 'tournamentCreate',
    component: () => import(/* webpackChunkName: "tournamentCreate" */ '../views/TournamentCreateView.vue')
  },
  {
    path: '/news-create',
    name: 'newsCreate',
    component: () => import(/* webpackChunkName: "newsCreate" */ '../views/NewsCreateView.vue')
  },

  {
    path: '/tournament/:id',
    name: 'tournament',
    component: () => import(/* webpackChunkName: "tournamentView" */ '../views/TournamentView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
