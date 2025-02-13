<template>
  <div class="pb-6">
    <label class="mb-2.5 block text-black dark:text-white">
      {{ label }}
      <span v-if="required" class="text-meta-1">*</span>
    </label>
    <div class="relative z-20 bg-white dark:bg-form-input">
      <select
        :value="modelValue"
        @change="handleChange"
        :required="required"
        class="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-normal text-black outline-none transition focus:border-primary active:border-primary invalid:text-gray-400 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:invalid:text-gray-500"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option v-for="(value, key) in options" :key="key" :value="value">{{ value }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    customClasses: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleChange(event: Event) {
      const target = event.target as HTMLSelectElement
      this.$emit('update:modelValue', target.value)
    }
  }
})
</script>
