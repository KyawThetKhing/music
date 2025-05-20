<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

import AppUpload from '@/components/Upload.vue'
import SongsList from '@/components/SongsList.vue'
import EditSong from '@/components/EditSong.vue'
import { songsCollection, auth } from '@/includes/firebase'
import { supabase } from '@/includes/supabaseClient'

const songs = ref([])
const songToEdit = ref(null)
const isShowForm = ref(false)
const unsavedFlag = ref(false)

onBeforeRouteLeave(() => {
  if (unsavedFlag.value) {
    const answer = window.confirm('You have unsaved changes. Are you sure you want to leave?')
    if (!answer) return false
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const getSongs = async () => {
  const snapshots = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

  snapshots.forEach((doc) => {
    songs.value.push({
      docID: doc.id,
      ...doc.data(),
    })
  })
}

const handleScroll = () => {
  const { scrollTop, offsetHeight } = document.documentElement
  const { innerHeight } = window
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

  if (bottomOfWindow) {
    getSongs()
  }
}

const editSong = (id) => {
  isShowForm.value = true
  songToEdit.value = songs.value.find((song) => song.docID === id)
}

const deleteSong = async (value) => {
  const storageRef = supabase.storage.from('music')
  try {
    await storageRef.remove(`music/${value.original_name}`)
    await songsCollection.doc(value.docID).delete()
  } finally {
    songs.value = songs.value.filter((song) => song.docID !== value.docID)
  }
}

const editedSong = (editedSong) => {
  songs.value = songs.value.map((song) => (song.docID === editedSong.docID ? editedSong : song))
}

const cancelEdit = () => {
  isShowForm.value = !isShowForm.value
  songToEdit.value = null
}
getSongs()
</script>
<template>
  <!-- Main Content -->
  <div class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload @uploaded="getSongs" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my_songs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <EditSong
              v-if="isShowForm"
              :songToEdit="songToEdit"
              @edited="editedSong($event)"
              @cancel="cancelEdit($event)"
              @dirty="unsavedFlag = true"
            />

            <SongsList
              v-for="song in songs"
              :key="song.docID"
              :song="song"
              @edit="editSong(song.docID)"
              @delete="deleteSong(song)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
