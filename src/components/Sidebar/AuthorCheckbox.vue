<template>
  <div class="flex items-center space-x-2">
    <label class="relative inline-flex items-center cursor-pointer">
      <div
        class="flex items-center justify-center w-8 h-8 rounded border-2 border-gray-400 bg-gray-100 peer-checked:border-green-500 peer-checked:bg-green-100 dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-green-500 dark:peer-checked:border-green-600 transition-all duration-300"
      >
        <span
          v-if="lessThanTwoAuthors === true"
          class="text-green-600 dark:text-green-200 transition-all duration-300"
        >
          ✓
        </span>
        <span v-else class="text-red-600 dark:text-red-200 transition-all duration-300"> ✗ </span>
      </div>
    </label>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ToggleCheckbox',
  props: ['lessThanTwoAuthors']
}
</script>
