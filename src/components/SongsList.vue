<!-- <script>
export default {
  name: 'SongsList',
  props: {
    song: {
      type: Object,
      default: {},
    },
  },
}
</script> -->
<script setup>
defineOptions({
  name: 'SongsList',
})

defineProps({
  song: {
    type: Object,
    default: {},
  },
})
const emit = defineEmits(['delete', 'edit'])
</script>
<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div>
      <h4 class="inline-block text-2xl font-bold">{{ song?.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click="emit('delete', song.id)"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click="emit('edit', song.id)"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
  </div>
</template>
