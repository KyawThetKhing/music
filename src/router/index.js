import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from '@/views/ManageView.vue'

import useUserStore from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/manage-music',
      name: 'manage',
      component: ManageView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/manage',
      redirect: { name: 'manage' },
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' },
    },
  ],
  linkActiveClass: 'text-yellow-500',
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore()
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})
export default router
