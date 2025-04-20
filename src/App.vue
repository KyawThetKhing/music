<script>
import { mapWritableState } from 'pinia'
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import AppPlayer from '@/components/Player.vue'
import { auth } from '@/includes/firebase'
import useUserStore from '@/stores/user'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer,
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  },
}
</script>
<template>
  <AppHeader />
  <!-- <router-view></router-view> -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <AppPlayer />
  <AppAuth />
</template>

<style>
.fade-enter-from {
  opacity: 0;
  background-color: red;
}

.fade-enter-active {
  transition: all 0.5s linear;
  background-color: green;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
  background-color: blue;
}
</style>
