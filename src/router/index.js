import Vue from 'vue'
import Router from 'vue-router'
// import home from 'pages/home'
// import category from 'pages/category'
// import cart from 'pages/cart'
// import personal from 'pages/personal'
// import search from 'pages/search'
// import product from 'pages/product'

Vue.use(Router)

const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('pages/home'),
    children: [
      {
        name: 'home-product',
        path: 'product/:id',
        component: () => import('pages/product')
      }
    ]
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('pages/category')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('pages/cart')
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import('pages/personal')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/search')
  },
  {
    path: '*',
    redirect: '/home'
  }
]
export default new Router({
  routes
})
