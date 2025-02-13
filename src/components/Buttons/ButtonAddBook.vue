<template>
  <div
    class="inline-flex items-center justify-center gap-2.5 mb-4 md:mb-6 text-center font-medium lg:px-8 xl:px-10"
  >
    <button
      @click="openForm"
      class="py-4 px-6 bg-blue-700 rounded-lg hover:bg-blue-800 duration-200 text-meta-2"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { useBookStore } from '@/stores/bookStore'
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    openForm() {
      const store = useBookStore()
      store.bookFormOpen = true
    }
  }
})
</script>
