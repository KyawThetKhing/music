import { createRouter, createWebHistory } from 'vue-router'

import useUserStore from '@/stores/user'

const HomeView = () => import('@/views/HomeView.vue')
const ManageView = () => import('@/views/ManageView.vue')
const SongView = () => import('@/views/SongView.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      path: '/song/:id',
      name: 'song',
      component: SongView,
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
