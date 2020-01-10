import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login/Login'
import Activity from '@/components/activity/Blog'
import Order from '@/components/mall/order/Order'
import Basic from '@/components/mall/goods/Basic'
import Price from '@/components/mall/goods/Price'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/table',
          name: 'Table',
          component: () => import('@/components/table/Table')
        },
        {
          path: '/im',
          name: 'Im',
          component: () => import('@/components/im/Im')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/basic',
      name: 'Basic',
      component: Basic
    },
    {
      path: '/price',
      name: 'Price',
      component: Price
    }
  ]
})
