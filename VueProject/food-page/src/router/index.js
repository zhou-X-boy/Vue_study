import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import FoodHome from '@/components/FoodHome'
import Cart from '@/components/Cart'
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'FoodHome',
      component: FoodHome,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
