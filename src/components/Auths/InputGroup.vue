<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  storeKey: String, // Key in the store to update
});

const userStore = useUserStore();
</script>

<template>
  <div class="mb-4">
    <label class="mb-2.5 block font-medium text-black dark:text-white">{{ label }}</label>
    <div class="relative">
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="userStore[storeKey]"
        class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
      />
      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
