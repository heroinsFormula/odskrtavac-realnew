<template>
  <!-- Delete Confirmation Dialog -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <DefaultCard class="w-full max-w-md mx-4">
      <div class="p-6.5">
        <h3 class="text-lg font-medium text-black dark:text-white mb-4">Odstranit knihu</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">Opravdu si přejete odstranit ?</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeWindow"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Ne
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Ano
          </button>
        </div>
      </div>
    </DefaultCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import { Book } from '@/types'
import DefaultCard from '@/components/Forms/DefaultCard.vue'

export default defineComponent({
  name: 'FormDeleteBook',
  components: {
    DefaultCard
  },
  setup() {},
  methods: {
    closeWindow() {
      useBookStore().deleteWarnOpen = false
    },

    confirmDelete() {
      useBookStore().deleteBook()
      this.closeWindow()
    }
  }
})
</script>
