import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '前台導覽列',
    component: () => import('../views/LayoutView.vue'),
    children: [
      {
        path: '',
        name: '首頁',
        component: () => import('../views/user/UserHome.vue')
      },
      {
        path: '/products',
        name: '產品列表',
        component: () => import('../views/user/UserProdusts.vue')
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/user/UserCart.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminDashboard.vue'),
    children: [
      {
        path: '/admin/products',
        component: () => import('../views/admin/AdminProdusts.vue')
      },
      {
        path: '/admin/orders',
        component: () => import('../views/admin/AdminOrders.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
