import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login/Login'
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
                },
                {
                    path: '/activity',
                    name: 'Activity',
                    component: () => import('@/components/activity/Blog')
                },
                {
                    path: '/soup',
                    name: 'Soup',
                    component: () => import('@/components/soup/Soup')
                },
                {
                    path: '/article',
                    name: 'Soup',
                    component: () => import('@/components/article/Article')
                },
                {
                    path: '/article-comment',
                    name: 'ArticleComment',
                    component: () => import('@/components/comment/ArticleComment')
                },
                {
                    path: '/add-activity',
                    name: 'AddActivity',
                    component: () => import('@/components/activity/Add')
                },
                {
                    path: '/goods-list',
                    name: 'GoodsList',
                    component: () => import('@/components/mall/goods/List')
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
                },
                {
                    path: '/limit-buy',
                    name: 'LimitBuy',
                    component: () => import('@/components/mall/limit/List')
                },
                {
                    path: '/mall-category',
                    name: 'MallCategory',
                    component: () => import('@/components/mall/Category')
                },
                {
                    path: '/brand-list',
                    name: 'BrandList',
                    component: () => import('@/components/mall/Brand')
                },
                {
                    path: '/mall-activity',
                    name: 'MallActivity',
                    component: () => import('@/components/activity/Blog')
                },
                {
                    path: '/mall-comment',
                    name: 'MallComment',
                    component: () => import('@/components/mall/goods/Comment')
                },
                {
                    path: '/mall-coupon',
                    name: 'MallCoupon',
                    component: () => import('@/components/mall/Coupon')
                },
                {
                    path: '/get-mall-coupon',
                    name: 'MallCouponList',
                    component: () => import('@/components/mall/CouponList')
                },
                {
                    path: '/activity-goods',
                    name: 'ActivityGoods',
                    component: () => import('@/components/mall/ActivityGoods')
                },
                {
                    path: '/limit-goods',
                    name: 'LimitGoods',
                    component: () => import('@/components/mall/limit/LimitGoods')
                },
                {
                    path: '/order-detail',
                    name: 'OrderDetail',
                    component: () => import('@/components/mall/order/Detail')
                },
                {
                    path: '/gift-goods',
                    name: 'GiftGoods',
                    component: () => import('@/components/mall/GiftGoods')
                },
                {
                    path: '/user',
                    name: 'Name',
                    component: () => import('@/components/blog/User')
                }
            ]
        },
        {
            path: '/im-a',
            name: 'Im',
            component: () => import('@/components/im/Im')
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})
