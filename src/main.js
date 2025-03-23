import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VeeValidatePlugin from '@/includes/validation'
import { auth, usersCollection } from '@/includes/firebase'

import App from './App.vue'
import router from './router'
import './assets/base.css'
import './assets/main.css'

let app

//NOTE: This is a common pattern in Vue applications to ensure that the app is only created once and check the authentication state using firebase
// Initialize Firebase
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)

    app.mount('#app')
  }
})
