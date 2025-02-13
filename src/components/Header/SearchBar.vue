<template>
  <div>
    <input
      type="text"
      v-model="searchParam"
      @input="updateSearchParam"
      placeholder="Search..."
      class="w-full xl:w-125 bg-transparent pr-4 pl-9 focus:outline-none"
    />
  </div>
</template>

<script lang="ts">
import { useBookSearchStore } from '@/stores/bookSearchStore'

export default {
  data() {
    return {
      searchParam: ''
    }
  },
  methods: {
    updateSearchParam() {
      const store = useBookSearchStore()
      store.searchParam = this.searchParam
      store.filterBooks()
    }
  }
}
</script>
