<script>
import { mapWritableState, mapState, mapActions } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  computed: {
    ...mapWritableState(useModalStore, ['isOpen']),
    ...mapState(useUserStore, ['userLoggedIn']),
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English'
    },
  },
  methods: {
    ...mapActions(useUserStore, ['signOut']),
    toggleAuthModal() {
      this.isOpen = !this.isOpen
    },
    logOut() {
      this.signOut()
      this.$router.replace({ name: 'home' })
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'fr' : 'en'
    },
  },
}
</script>
<template>
  <header id="header" class="bg-gray-700 sticky top-0 left-0 right-0 z-10">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        :to="{ name: 'home' }"
        class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-active"
      >
        Music
      </RouterLink>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <!-- <li>
            <RouterLink :to="{ name: 'about' }" class="px-2 text-white"> About </RouterLink>
          </li> -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" @click="toggleAuthModal">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <RouterLink :to="{ name: 'manage' }" class="px-2 text-white">Manage</RouterLink>
            </li>
            <li>
              <a class="px-2 text-white" @click.prevent="logOut">Logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
