<template>
  <DefaultLayout>
    <DefaultAuthCard>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="mb-2.5 block font-medium text-black dark:text-white"
            >Uživatelské jméno</label
          >
          <div class="relative">
            <input
              type="text"
              placeholder="Zadejte uživatelské jméno..."
              v-model="username"
              autocomplete="new-username"
              class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
            />
            <span class="absolute right-4 top-4">
              <userIcon />
            </span>
          </div>
        </div>

        <div class="mb-4">
          <label class="mb-2.5 block font-medium text-black dark:text-white">Heslo</label>
          <div class="relative">
            <input
              type="password"
              placeholder="Zadejte heslo..."
              v-model="password"
              autocomplete="new-password"
              class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
            />
            <span class="absolute right-4 top-4">
              <passwordIcon />
            </span>
          </div>
        </div>

        <div class="mb-4">
          <label class="mb-2.5 block font-medium text-black dark:text-white">Ověření hesla</label>
          <div class="relative">
            <input
              type="password"
              placeholder="Znovu zadejte heslo..."
              v-model="confirmPassword"
              autocomplete="new-password"
              class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
            />
            <span class="absolute right-4 top-4">
              <passwordIcon />
            </span>
          </div>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

        <div class="mb-5 mt-6">
          <input
            type="submit"
            value="Registrovat se"
            class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          />
        </div>

        <div class="mt-6 text-center">
          <p class="font-medium">
            Již máte účet?
            <router-link to="/login" class="text-primary">Přihlaste se</router-link>
          </p>
        </div>
      </form>
    </DefaultAuthCard>
  </DefaultLayout>
</template>

<script lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import userIcon from '@/assets/images/icon/icon-user.svg'
import passwordIcon from '@/assets/images/icon/icon-password.svg'

import { defineComponent, ref } from 'vue'
import { userService } from '@/api/userService'
import axios from 'axios'

export default defineComponent({
  components: {
    DefaultAuthCard,
    InputGroup,
    DefaultLayout,
    userIcon,
    passwordIcon
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    }
  },
  methods: {
    handleSubmit() {
      if (this.username === '' || this.password === '') {
        console.log('fuck')
        return
      }
      this.register()
    },
    async register() {
      try {
        userService.registerUser(this.username, this.password)
        const response = await userService.loginUser(this.username, this.password)
        console.log(response)
        localStorage.setItem('refreshToken', response.data.refresh)
        const router = this.$router
        router.push('/')
      } catch (error) {
        console.error(error)
        this.errorMessage = 'Nepodařilo se registrovat!'
      }
    }
  }
})
</script>
