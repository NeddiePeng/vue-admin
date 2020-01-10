import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login/Login'
import Activity from '@/components/activity/Blog'
import Order from '@/components/mall/order/Order'
import Basic from '@/components/mall/goods/Basic'
import Price from '@/components/mall/goods/Price'
import Attr from '@/components/mall/goods/Attr'
import Combination from '@/components/mall/goods/Combination'
import Detail from '@/components/mall/goods/Detail'
import ActivityGoods from '@/components/mall/goods/ActivityGoods'

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
    },
    {
      path: '/attr',
      name: 'Attr',
      component: Attr
    },
    {
      path: '/combination',
      name: 'Combination',
      component: Combination
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/activityGoods',
      name: 'ActivityGoods',
      component: ActivityGoods
    }
  ]
})
