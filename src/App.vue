<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import AppPlayer from '@/components/Player.vue'
import { auth } from '@/includes/firebase'
import useUserStore from '@/stores/user'

defineOptions({
  name: 'App',
})
const userStore = useUserStore()

if (auth.currentUser) {
  userStore.userLoggedIn = true
}
</script>

<template>
  <AppHeader />
  <router-view></router-view>
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view> -->
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
