<!-- <script>
import { mapState, mapWritableState } from 'pinia'
import useModalStore from '@/stores/modal'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'AppAuth',
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      tab: 'LoginForm',
    }
  },
  computed: {
    ...mapState(useModalStore, ['hiddenClass']),
    ...mapWritableState(useModalStore, {
      modalVisibility: 'isOpen',
    }),
  },
  methods: {},
}
</script> -->
<script setup>
import { ref } from 'vue'
import useModalStore from '@/stores/modal'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const tabs = {
  LoginForm,
  RegisterForm,
}
const currentTab = ref('LoginForm')
const modalStore = useModalStore()
</script>

<template>
  <!-- Auth Modal -->
  <div :class="modalStore.hiddenClass" class="fixed z-10 inset-0 overflow-y-auto" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">{{ $t('register.your_account') }}</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="modalStore.isOpen = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': currentTab === 'LoginForm',
                  'hover:text-blue-600': currentTab === 'RegisterForm',
                }"
                href="#"
                @click="currentTab = 'LoginForm'"
              >
                {{ $t('register.login') }}
                <p>{{ tab }}</p>
              </a>
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': currentTab === 'RegisterForm',
                  'hover:text-blue-600': currentTab === 'LoginForm',
                }"
                href="#"
                @click="currentTab = 'RegisterForm'"
              >
                {{ $t('register.register') }}
              </a>
            </li>
          </ul>

          <component :is="tabs[currentTab]"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
