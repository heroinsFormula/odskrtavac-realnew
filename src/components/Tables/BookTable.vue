<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
    <div v-for="book in books" :class="`grid grid-cols-6 sm:grid-cols-6 items-center`"
    :key="book.id">
      <book-table-row :book="book" />
    </div>

  </div>
</template>

<script lang="ts">
import { useBookStore } from '@/stores/bookStore';
import { Book } from '@/types';
import { defineComponent } from 'vue';
import HeaderRow from './HeaderRow.vue';
import BookTableRow from './BookTableRow.vue';

export default defineComponent({
  components: {
    HeaderRow,
    BookTableRow,
  },
  computed: {
    books(): Book[] {
      const store = useBookStore()
      return store.books
    }
  },
  mounted() {
    const store = useBookStore();
    store.getBooks();
    console.log(this.books)
  }
});
</script>
