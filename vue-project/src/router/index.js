import { createRouter, createWebHistory } from 'vue-router'

import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/',
      redirect: '/login'
    },
  ]
})

export default router
