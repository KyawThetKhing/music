<script>
import { songsCollection } from '@/includes/firebase'
import AppSongItem from '@/components/SongItem.vue'

export default {
  name: 'HomeView',
  components: {
    AppSongItem,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 20,
      isPendingRequest: false,
    }
  },
  created() {
    this.getSongs()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if (bottomOfWindow) {
        this.getSongs()
      }
    },
    async getSongs() {
      if (this.isPendingRequest) return
      this.isPendingRequest = true
      let snapshots
      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docID).get()

        snapshots = await songsCollection
          // .where('uid', '==', auth.currentUser.uid)
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get()
      } else {
        snapshots = await songsCollection
          // .where('uid', '==', auth.currentUser.uid)
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get()
      }

      snapshots.forEach((doc) => {
        this.songs.push({
          docID: doc.id,
          ...doc.data(),
        })
      })
      this.isPendingRequest = false
    },
  },
}
</script>
<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            {{ $t('home.description') }}
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">{{ $t('home.songs') }}</span>
          <!-- Icon -->
          <div v-icon.right.yellow="'fa fa-headphones-alt'"></div>
        </div>
        <!-- Playlist -->
        <ol id="playlist" v-if="songs.length">
          <AppSongItem v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <p v-else class="text-center py-8">No songs available</p>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>
