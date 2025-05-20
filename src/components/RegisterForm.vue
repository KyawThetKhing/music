<script setup>
import { ref } from 'vue'

import useUserStore from '@/stores/user'

defineOptions({
  name: 'RegisterForm',
})
const userStore = useUserStore()

const registerSchema = ref({
  name: 'required|min:3|max:100',
  email: 'required|min:3|max:100|email',
  age: 'required|minValue:18|maxValue:120|numeric',
  password: 'required|min:3|max:100',
  confirmPassword: 'passwords_mismatch:@password',
  country: 'required|country_excluded:Myanmar',
  userType: 'required',
  tos: 'tos',
})

const userData = ref({
  country: 'USA',
  userType: 'listener',
})

const regInSubmission = ref(false)
const regShowAlert = ref(false)
const regAlertVariant = ref('')
const regAlertMsg = ref('')

const handleRegister = async (values) => {
  regInSubmission.value = true
  regShowAlert.value = true
  regAlertVariant.value = 'bg-blue-500'
  regAlertMsg.value = 'Please wait as we process your registration'
  try {
    await userStore.register(values)
  } catch (error) {
    regInSubmission.value = false
    regAlertVariant.value = 'bg-red-500'
    regAlertMsg.value = 'An error occurred. Please try again.'
    return
  }
  regAlertVariant.value = 'bg-green-500'
  regAlertMsg.value = 'Success! Your registration is complete'

  window.location.reload()
}
</script>

<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="regAlertVariant"
    v-if="regShowAlert"
  >
    {{ regAlertMsg }}
  </div>
  <VeeForm :validation-schema="registerSchema" @submit="handleRegister" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.name') }}</label>
      <VeeField
        as="input"
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage name="name" class="text-red-600" />
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.age') }}</label>
      <VeeField
        as="input"
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage name="age" class="text-red-600" />
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
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.confirm_password') }}</label>
      <VeeField
        as="input"
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage name="confirmPassword" class="text-red-600" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.country') }}</label>
      <VeeField
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">{{ $t('register.usa') }}</option>
        <option value="Mexico">{{ $t('register.mexico') }}</option>
        <option value="Germany">{{ $t('register.germany') }}</option>
        <option value="Myanmar">{{ $t('register.myanmar') }}</option>
      </VeeField>
      <ErrorMessage name="country" class="text-red-600" />
    </div>
    <!-- User Type -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.register_as') }}</label>
      <VeeField
        name="userType"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="artist">{{ $t('register.artist') }}</option>
        <option value="listener">{{ $t('register.listener') }}</option>
      </VeeField>
      <ErrorMessage name="userType" class="text-red-600" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        value="1"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="#">{{ $t('register.tos') }}</a>
      </i18n-t>
      <ErrorMessage name="tos" class="text-red-600 block" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="regInSubmission"
    >
      {{ $t('register.submit') }}
    </button>
  </VeeForm>
</template>
