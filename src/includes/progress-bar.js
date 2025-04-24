import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default (router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
