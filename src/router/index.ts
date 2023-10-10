import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import AuthenticationPage from '../views/AuthenticationPage.vue';
import NewTeamPage from '../views/NewTeamPage.vue';
import DetailePage from '../views/DetailePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: "/authentication",
    name: "Login",
    component: AuthenticationPage,
  },
  {
    path: "/new-team",
    name: "NewTeam",
    component: NewTeamPage,
  },
  {
    path: "detail/:id",
    name: "Detail",
    component: DetailePage
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
