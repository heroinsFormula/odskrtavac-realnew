<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      @input="updateSearchQuery"
      placeholder="Search..."
      class="w-full xl:w-125 bg-transparent pr-4 pl-9 focus:outline-none"
    />
  </div>
</template>

<script lang="ts">
import { useBookStore } from "@/stores/bookStore";

export default {
  setup() {
    const store = useBookStore();
    const searchQuery = store.searchQuery;

    const updateSearchQuery = () => {
      try {
        store.setSearchQuery(store.searchQuery); // Set the query in the store
      } catch (error) {
        console.error('Error during search:', error); // Catch any errors here
      }
    };

    return {
      searchQuery,
      updateSearchQuery,
    };
  },
};
</script>