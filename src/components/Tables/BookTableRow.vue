<template>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <p class="hidden text-black text-left dark:text-white sm:block">
      {{ book.author ? book.author.alt_name || book.author.full_name : 'Neznámý' }}
    </p>
  </div>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <p class="hidden text-black text-left dark:text-white sm:block">{{ book.title_name }}</p>
  </div>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <p class="hidden text-black text-left dark:text-white sm:block">{{ book.publish_year }}</p>
  </div>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <p class="hidden text-black text-left dark:text-white sm:block">{{ book.country }}</p>
  </div>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <p class="hidden text-black text-center dark:text-white sm:block">{{ book.literary_type }}</p>
  </div>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <book-table-checkmark :is_read_by_user="book.is_read_by_user" :slug="book.slug" />
  </div>
</template>

<script lang="ts">
import { Book } from '@/types'
import BookTableCheckmark from './BookTableCheckmark.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  components: {
    BookTableCheckmark
  },
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    }
  }
})
</script>
