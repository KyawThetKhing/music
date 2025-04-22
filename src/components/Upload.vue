<script>
import { auth, songsCollection } from '@/includes/firebase'
import { supabase } from '@/includes/supabaseClient'

export default {
  name: 'Upload',
  data() {
    return {
      isDragOver: false,
      uploads: [],
    }
  },
  methods: {
    async upload($event) {
      this.isDragOver = false
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]

      for (const file of files) {
        if (file.type !== 'audio/mpeg') continue

        const storageRef = supabase.storage.from('music')
        const filePath = `${file.name}`

        const upload = {
          task: null,
          current_progress: 0,
          name: file.name,
          variant: 'private',
          icon: 'fa fa-spinner fa-spin',
          text_class: 'text-gray-400',
        }

        this.uploads.push(upload)
        const uploadIndex = this.uploads.length - 1

        const fakeProgress = setInterval(() => {
          const item = this.uploads[uploadIndex]
          if (item.current_progress < 95) {
            item.current_progress += 5
          } else {
            clearInterval(fakeProgress)
          }
        }, 200)

        const { data, error } = await storageRef.upload(filePath, file, {
          contentType: 'audio/mpeg',
          upsert: true,
        })
        clearInterval(fakeProgress)

        const uploadItem = this.uploads[uploadIndex]

        if (error) {
          uploadItem.variant = 'bg-red-400'
          uploadItem.icon = 'fa fa-times'
          uploadItem.text_class = 'text-red-400'
          uploadItem.current_progress = 100
          continue
        }
        const {
          data: { publicUrl },
          error: publicUrlError,
        } = await storageRef.getPublicUrl(filePath)
        if (publicUrlError) {
          uploadItem.variant = 'bg-red-400'
          uploadItem.icon = 'fa fa-times'
          uploadItem.text_class = 'text-red-400'
          uploadItem.current_progress = 100
          continue
        }
        console.log('🚀 ~ Upload.vue:68 ~ upload ~ publicUrl:', publicUrl)
        const song = {
          uid: auth.currentUser.uid,
          display_name: auth.currentUser.displayName,
          original_name: file.name,
          modified_name: file.name,
          genre: '',
          comment_count: 0,
          url: publicUrl,
          created_at: new Date(),
        }
        await songsCollection.add(song)

        uploadItem.task = data
        uploadItem.current_progress = 100
        uploadItem.variant = 'bg-green-400'
        uploadItem.icon = 'fa fa-check'
        uploadItem.text_class = 'text-green-400'
      }

      this.$emit('uploaded')
    },
  },
}
</script>

<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t('manage.upload') }}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': isDragOver }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragOver = false"
        @dragover.prevent.stop="isDragOver = true"
        @dragenter.prevent.stop="isDragOver = true"
        @dragleave.prevent.stop="isDragOver = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>{{ $t('manage.drop_files') }}</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
