<!-- <script>
import { mapActions, mapState } from 'pinia'
import usePlayerStore from '@/stores/player'

export default {
  name: 'AppPlayer',
  computed: {
    ...mapState(usePlayerStore, ['currentSong', 'playing', 'duration', 'seek', 'playerProgress']),
  },
  methods: {
    ...mapActions(usePlayerStore, ['toggleAudio', 'updateSeek']),
  },
}
</script> -->
<script setup>
import usePlayerStore from '@/stores/player'

defineOptions({
  name: 'AppPlayer',
})

const playerStore = usePlayerStore()
</script>
<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full"
    v-if="playerStore.currentSong.modified_name"
  >
    <!-- Track Info -->
    <div class="text-center" v-if="playerStore.currentSong.modified_name">
      <span class="song-title font-bold">{{ playerStore.currentSong.modified_name }}</span> by
      <span class="song-artist">{{ playerStore.currentSong.display_name }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="playerStore.toggleAudio">
        <i
          class="fa text-gray-500 text-xl"
          :class="{ 'fa-pause': playerStore.playing, 'fa-play': !playerStore.playing }"
        >
        </i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ playerStore.seek }}</div>
      <!-- Scrub Container  -->
      <div
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
        @click="playerStore.updateSeek"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerStore.playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerStore.playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ playerStore.duration }}</div>
    </div>
  </div>
</template>
