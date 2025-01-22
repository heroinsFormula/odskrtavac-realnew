<template>
  <li>
    <div
      class='group relative flex items-center gap-1 py-4 px-4 font-medium text-bodydark1 duration-300 ease-in'
    >
      <span>
        Opakující se autoři: {{ authors.join(', ') }}
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
  props: ['authors']
});
</script>