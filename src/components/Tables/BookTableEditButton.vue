<template>
  <button
    @click="editBook"
    class="p-default p-svg p-smooth p-curve text-gray-500 hover:text-blue-600 transition-colors duration-200"
    aria-label="Edit book"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBookStore } from '@/stores/bookStore'

export default defineComponent({
  name: 'BookTableEditButton',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useBookStore()

    const editBook = () => {
      store.setCurrentBookSlug(props.slug)
      store.bookEditFormOpen = true
    }

    return {
      editBook
    }
  }
})
</script>
