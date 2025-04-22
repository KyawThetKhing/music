<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100',
      },
      loginInSubmission: false,
      loginShowAlert: false,
      loginAlertVariant: '',
      loginAlertMsg: '',
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async handleLogin(values) {
      this.loginInSubmission = true
      this.loginShowAlert = true
      this.loginAlertVariant = 'bg-blue-500'
      this.loginAlertMsg = 'Please wait as we process your login'

      try {
        await this.authenticate(values)
      } catch (error) {
        this.loginInSubmission = false
        this.loginAlertVariant = 'bg-red-500'
        this.loginAlertMsg = 'Invalid email or password'
        return
      }

      this.loginAlertVariant = 'bg-green-500'
      this.loginAlertMsg = 'Success! Your login is complete'

      window.location.reload()
    },
  },
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
