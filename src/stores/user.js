import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      console.log('🚀 ~ user.js:29 ~ authenticate ~ values:', values)

      const userCredential = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password,
      )
      await usersCollection.doc(userCredential.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        userType: values.userType,
      })

      await userCredential.user.updateProfile({
        displayName: values.name,
      })

      this.userLoggedIn = true
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)
      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    },
  },
})
