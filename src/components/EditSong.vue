<!-- <script>
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
</script> -->
<script setup>
import { ref, watch } from 'vue'

import { songsCollection } from '@/includes/firebase'

const props = defineProps({
  songToEdit: {
    type: Object,
    default: {},
  },
})

const emit = defineEmits(['edited', 'cancel'])

const editSongSchema = ref({
  title: 'required|min:3|max:100',
  genre: 'required',
})

const form = ref({
  title: props.songToEdit.modified_name || '',
  genre: props.songToEdit.genre || '',
})

const inSubmission = ref(false)
const showAlert = ref(false)
const alertVariant = ref('bg-blue-500')
const alertMessage = ref('Please wait! Updating song info')

watch(
  () => props.songToEdit,
  (newSong) => {
    form.value = {
      title: newSong.modified_name || '',
      genre: newSong.genre || '',
    }
  },
  { deep: true },
)

const editedSong = async () => {
  const updatedSong = {
    ...props.songToEdit,
    modified_name: form.value.title,
    genre: form.value.genre,
  }
  try {
    inSubmission.value = true
    showAlert.value = true
    alertVariant.value = 'bg-blue-500'
    alertMessage.value = 'Please wait! Updating song info'
    await songsCollection.doc(props.songToEdit.docID).update(updatedSong)
  } catch (e) {
    alertVariant.value = 'bg-red-500'
    alertMessage.value = 'Something went wrong! Please try again'
  } finally {
    inSubmission.value = false
    showAlert.value = true
    alertVariant.value = 'bg-green-500'
    alertMessage.value = 'Success! Your song has been updated'
    emit('edited', updatedSong)
  }
}

const cancelEdit = () => {
  emit('cancel')
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
