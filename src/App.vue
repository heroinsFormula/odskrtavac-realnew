<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useBookStore } from './stores/bookStore'
const userStore = useUserStore()
const bookStore = useBookStore()

onMounted(() => {
  userStore.updateLoggedIn()
  if (userStore.loggedIn) {
    bookStore.updateStore()
  }
})
</script>

<template>
  <RouterView />
</template>
