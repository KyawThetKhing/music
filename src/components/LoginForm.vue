<script setup>
import { ref } from 'vue'

import useUserStore from '@/stores/user'

const loginSchema = ref({
  email: 'required|min:3|max:100|email',
  password: 'required|min:3|max:100',
})
const loginInSubmission = ref(false)
const loginShowAlert = ref(false)
const loginAlertVariant = ref('')
const loginAlertMsg = ref('')

const userStore = useUserStore()

const handleLogin = async (values) => {
  loginInSubmission.value = true
  loginShowAlert.value = true
  loginAlertVariant.value = 'bg-blue-500'
  loginAlertMsg.value = 'Please wait as we process your login'

  try {
    await userStore.authenticate(values)
  } catch (error) {
    loginInSubmission.value = false
    loginAlertVariant.value = 'bg-red-500'
    loginAlertMsg.value = 'Invalid email or password'
    return
  }

  loginAlertVariant.value = 'bg-green-500'
  loginAlertMsg.value = 'Success! Your login is complete'

  window.location.reload()
}
</script>

<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="loginAlertVariant"
    v-if="loginShowAlert"
  >
    {{ loginAlertMsg }}
  </div>

  <!-- Login Form -->
  <VeeForm :validation-schema="loginSchema" @submit="handleLogin">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.email') }}</label>
      <VeeField
        as="input"
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.password') }}</label>
      <VeeField
        as="input"
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-600" />
    </div>
    <button
      :disabled="loginInSubmission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      {{ $t('register.submit') }}
    </button>
  </VeeForm>
</template>
