<script>
import { songsCollection } from '@/includes/firebase'

export default {
  name: 'EditSong',
  props: {
    songToEdit: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      editSongSchema: {
        title: 'required|min:3|max:100',
        genre: 'required',
      },
      form: {
        title: this.songToEdit.modified_name || '',
        genre: this.songToEdit.genre || '',
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: 'bg-blue-500',
      alertMessage: 'Please wait! Updating song info',
    }
  },
  watch: {
    songToEdit: {
      handler(newSong) {
        this.form = {
          title: newSong.modified_name || '',
          genre: newSong.genre || '',
        }
      },
      deep: true,
    },
  },
  methods: {
    async editedSong() {
      const updatedSong = {
        ...this.songToEdit,
        modified_name: this.form.title,
        genre: this.form.genre,
      }
      try {
        this.inSubmission = true
        this.showAlert = true
        this.alertVariant = 'bg-blue-500'
        this.alertMessage = 'Please wait! Updating song info'
        await songsCollection.doc(this.songToEdit.docID).update(updatedSong)
      } catch (e) {
        this.alertVariant = 'bg-red-500'
        this.alertMessage = 'Something went wrong! Please try again'
      } finally {
        this.inSubmission = false
        this.showAlert = true
        this.alertVariant = 'bg-green-500'
        this.alertMessage = 'Success! Your song has been updated'
        this.$emit('edited', updatedSong)
      }
    },
    cancelEdit() {
      this.$emit('cancel')
    },
  },
}
</script>
<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div>
      <h4 class="inline-block text-2xl font-bold">{{ songToEdit?.modified_name }}</h4>
      <!-- <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times"></i>
      </button>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
        <i class="fa fa-pencil-alt"></i>
      </button> -->
    </div>

    <div>
      <div class="text-white text-center font-bold p-4 mb-4" v-if="showAlert" :class="alertVariant">
        {{ alertMessage }}
      </div>
      <VeeForm @submit="editedSong" :initial-values="form" :validation-schema="editSongSchema">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('manage.song_title') }}</label>
          <VeeField
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            name="title"
            v-model="form.title"
            @input="$emit('dirty')"
          />
          <ErrorMessage name="title" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('manage.genre') }}</label>
          <VeeField
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            name="genre"
            v-model="form.genre"
            @input="$emit('dirty')"
          />
          <ErrorMessage name="genre" class="text-red-600" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600 mr-3"
          :disabled="inSubmission"
        >
          {{ $t('manage.submit') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click="cancelEdit"
          :disabled="inSubmission"
        >
          {{ $t('manage.go_back') }}
        </button>
      </VeeForm>
    </div>
  </div>
</template>
