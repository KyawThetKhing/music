<script>
import { ErrorMessage } from 'vee-validate'
import { mapState, mapActions } from 'pinia'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import useUserStore from '@/stores/user'
import usePlayerStore from '@/stores/player'

import { songsCollection, auth, commentsCollection } from '@/includes/firebase'
dayjs.extend(relativeTime)

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
      comments: [],
      sort: '1',
    }
  },
  async beforeRouteEnter(to, from, next) {
    const docSnapshot = await songsCollection.doc(to.params.id).get()
    next((vm) => {
      if (!docSnapshot.exists) {
        vm.$router.push({ name: 'home' })
        return
      }
      vm.song = docSnapshot.data()
      const { sort } = vm.$route.query

      vm.sort = sort === '1' || sort === '2' ? sort : '1'
      vm.getComments()
    })
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapState(usePlayerStore, ['playing']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted)
        }
        return new Date(a.datePosted) - new Date(b.datePosted)
      })
    },
  },
  watch: {
    sort(newValue) {
      if (newValue === this.$route.query.sort) return
      this.$router.push({
        name: 'song',
        params: { id: this.$route.params.id },
        query: { sort: newValue },
      })
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
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
      this.getComments()
    },
    async getComments() {
      const snapshots = await commentsCollection.where('sid', '==', this.$route?.params?.id).get()
      this.comments = []

      snapshots.forEach((doc) => {
        this.comments.push({
          docID: doc.id,
          ...doc.data(),
        })
      })
    },
    calculateDateAgo(date) {
      return dayjs(date).fromNow()
    },
  },
}
</script>
<template>
  <main>
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
          @click.prevent="newSong(song)"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i class="fa" :class="{ 'fa-pause': playing, 'fa-play': !playing }"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1, 'currency', 'ja') }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $tc('song.comment_count', comments.length, { count: comments.length })
          }}</span>
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
              {{ $t('song.submit') }}
            </button>
          </VeeForm>
          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            v-model="sort"
          >
            <option value="1">{{ $t('song.latest') }}</option>
            <option value="2">{{ $t('song.oldest') }}</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto" id="comments">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ calculateDateAgo(comment.datePosted) }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>
