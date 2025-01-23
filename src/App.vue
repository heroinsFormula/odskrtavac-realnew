<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

onMounted(() => {
  userStore.updateLoggedIn() // Check if the user is logged in when the app mounts
})
</script>

<template>
  <RouterView />
</template>
