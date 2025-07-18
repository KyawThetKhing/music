import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'

import VeeValidatePlugin from '@/includes/validation'
import { auth } from '@/includes/firebase'
import Icon from '@/directives/icon'
import i18n from '@/includes/i18n'
import GlobalComponents from '@/includes/_globals'
import ProgressBar from '@/includes/progress-bar'

import App from './App.vue'
import router from './router'
import './assets/base.css'
import './assets/main.css'

registerSW({ immediate: true })
ProgressBar(router)
let app

//NOTE: This is a common pattern in Vue applications to ensure that the app is only created once and check the authentication state using firebase
// Initialize Firebase
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)
    app.directive('icon', Icon)
    app.use(i18n)
    app.use(GlobalComponents)
    app.mount('#app')
  }
})
