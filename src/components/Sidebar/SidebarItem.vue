<template>
  <li>
    <div
      :class="{
        'group relative flex items-center gap-1 py-4 px-4 font-medium text-bodydark1 duration-300 ease-in': true,
        'bg-green-500': readCount >= maxCount || (authors && authors.length < 1)
      }"
    >
      <span v-html="icon"></span>

      <span v-if="type === 'author'">
        {{ label }}
        <li v-if="(authors && authors.length > 0)"><br>
         Opakující se autoři: {{ authors.join(', ') }}
        </li>
      </span>
      <span v-else>
        {{ label }}: {{ readCount }}/{{ maxCount }}
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidebarDropdown from './SidebarDropdown.vue';
import AuthorCheckbox from './AuthorCheckbox.vue';

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarDropdown,
    AuthorCheckbox,
  },
  props: ['type', 'icon', 'label', 'readCount', 'maxCount', 'authors']
});
</script>