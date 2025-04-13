<script>
import { ErrorMessage } from 'vee-validate'
import { mapState } from 'pinia'

import useUserStore from '@/stores/user'
import { songsCollection, auth, commentsCollection } from '@/includes/firebase'

export default {
  name: 'SongView',
  data() {
    return {
      song: {},
      commentSchema: {
        comment: 'required|min:3',
      },
      commentInSubmission: false,
      commentShowAlert: false,
      commentAlertVariant: 'bg-green-500',
      commentAlertMessage: 'Please wait! Your comment is being added...',
    }
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get()
    if (!docSnapshot.exists) {
      this.$router.push({ name: 'home' })
      return
    }
    this.song = docSnapshot.data()
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  methods: {
    async addComment(values, { resetForm }) {
      this.commentInSubmission = true
      this.commentShowAlert = true
      this.commentAlertVariant = 'bg-blue-500'
      this.commentAlertMessage = 'Please wait! Your comment is being submitted...'

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      }

      await commentsCollection.add(comment)

      this.commentInSubmission = false
      this.commentShowAlert = true
      this.commentAlertVariant = 'bg-green-500'
      this.commentAlertMessage = 'Success! Your comment has been added'
      resetForm()
    },
  },
}
</script>
<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modified_name }}</div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments (15)</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          class="text-white text-center font-bold p-4 mb-4"
          v-if="commentShowAlert"
          :class="commentAlertVariant"
        >
          {{ commentAlertMessage }}
        </div>
        <VeeForm :validation-schema="commentSchema" @submit="addComment" v-if="userLoggedIn">
          <VeeField
            name="comment"
            as="textarea"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          >
          </VeeField>
          <ErrorMessage name="comment" class="text-red-600" />
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
            :disabled="commentInSubmission"
          >
            Submit
          </button>
        </VeeForm>
        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto">
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque
        laudantium.
      </p>
    </li>
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque
        laudantium.
      </p>
    </li>
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque
        laudantium.
      </p>
    </li>
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque
        laudantium.
      </p>
    </li>
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque
        laudantium.
      </p>
    </li>
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque
        laudantium.
      </p>
    </li>
  </ul>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button">
        <i class="fa fa-play text-gray-500 text-xl"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>
</template>
