<script>
import { mapActions } from 'pinia'

import useUserStore from '@/stores/user'
import { auth, usersCollection } from '@/includes/firebase'

export default {
  name: 'RegisterForm',
  data() {
    return {
      registerSchema: {
        name: 'required|min:3|max:100|alphSpaces',
        email: 'required|min:3|max:100|email',
        age: 'required|minValue:18|maxValue:120|numeric',
        password: 'required|min:3|max:100',
        confirmPassword: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Myanmar',
        userType: 'required',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
        userType: 'listener',
      },
      regInSubmission: false,
      regShowAlert: false,
      regAlertVariant: '',
      regAlertMsg: '',
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register',
    }),
    async handleRegister(values) {
      this.regInSubmission = true
      this.regShowAlert = true
      this.regAlertVariant = 'bg-blue-500'
      this.regAlertMsg = 'Please wait as we process your registration'
      try {
        await this.createUser(values)
      } catch (error) {
        this.regInSubmission = false
        this.regAlertVariant = 'bg-red-500'
        this.regAlertMsg = 'An error occurred. Please try again.'
        return
      }
      this.regAlertVariant = 'bg-green-500'
      this.regAlertMsg = 'Success! Your registration is complete'

      window.location.reload()
    },
  },
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
      <label class="inline-block mb-2">Name</label>
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
      <label class="inline-block mb-2">Email</label>
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
      <label class="inline-block mb-2">Age</label>
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
      <label class="inline-block mb-2">Password</label>
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
      <label class="inline-block mb-2">Confirm Password</label>
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
      <label class="inline-block mb-2">Country</label>
      <VeeField
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Myanmar">Myanmar</option>
      </VeeField>
      <ErrorMessage name="country" class="text-red-600" />
    </div>
    <!-- User Type -->
    <div class="mb-3">
      <label class="inline-block mb-2">Register as</label>
      <VeeField
        name="userType"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="artist">Artist</option>
        <option value="listener">Listener</option>
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
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage name="tos" class="text-red-600 block" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="regInSubmission"
    >
      Submit
    </button>
  </VeeForm>
</template>
