<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="flex flex-col">
      <div class="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
        <header-row>Autor</header-row>
        <header-row>Název</header-row>
        <header-row>Rok vydání</header-row>
        <header-row>Původ</header-row>
        <header-row>Literární druh</header-row>
        <header-row>Přečteno</header-row>
      </div>
    </div>
    <div
      v-for="book in books"
      :class="`grid grid-cols-6 sm:grid-cols-6 items-center`"
      :key="book.id"
    >
      <BookTableRow :book="book" :is-admin="isAdmin" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import { useUserStore } from '@/stores/userStore'
import HeaderRow from './HeaderRow.vue'
import BookTableRow from './BookTableRow.vue'

export default defineComponent({
  components: {
    HeaderRow,
    BookTableRow
  },
  setup() {
    const bookStore = useBookStore()
    const userStore = useUserStore()

    // Make sure isAdmin is always reactive
    const isAdmin = computed(() => userStore.isAdmin)
    const books = computed(() => bookStore.books)

    onMounted(async () => {
      await bookStore.getBooks()
      await userStore.updateIsAdmin()

      console.log('Admin status:', isAdmin.value)
    })

    return {
      books,
      isAdmin
    }
  }
})
</script>
