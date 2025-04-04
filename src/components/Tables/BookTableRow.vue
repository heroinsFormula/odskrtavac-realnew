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
    <p class="hidden text-black text-left dark:text-white sm:block">
      {{ book.publish_year < 0 ? `${Math.abs(book.publish_year)} př. n. l.` : book.publish_year }}
    </p>
  </div>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <p class="hidden text-black text-left dark:text-white sm:block">{{ book.country }}</p>
  </div>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <p class="hidden text-black text-center dark:text-white sm:block">{{ book.literary_type }}</p>
  </div>
  <div class="flex items-center gap-3 p-2.5 xl:p-5">
    <BookTableCheckmark :is_read_by_user="book.is_read_by_user" :slug="book.slug" />
    <template v-if="isAdmin">
      <BookTableEditButton :slug="book.slug" />
      <BookTableDeleteButton :slug="book.slug" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Book } from '@/types'
import BookTableCheckmark from './BookTableCheckmark.vue'
import BookTableEditButton from './BookTableEditButton.vue'
import BookTableDeleteButton from './BookTableDeleteButton.vue'

export default defineComponent({
  components: {
    BookTableCheckmark,
    BookTableEditButton,
    BookTableDeleteButton
  },
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  }
})
</script>
