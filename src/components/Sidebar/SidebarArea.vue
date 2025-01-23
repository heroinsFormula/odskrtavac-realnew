<template>
  <aside
    class="absolute left-0 top-0 z-9999 flex h-screen w-3/20 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
  >
    <!-- SIDEBAR HEADER -->
    <div class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
      <img src="@/assets/images/logo/logo.svg" alt="Logo" />
      <button class="block lg:hidden">
        <svg
          class="fill-current"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
            fill=""
          />
        </svg>
      </button>
    </div>
    <!-- SIDEBAR HEADER -->

    <div class="no-scrollbar flex flex-1 flex-col overflow-y-auto duration-300 ease-linear">
      <!-- Sidebar Menu -->
      <nav class="flex-1">
        <div>
          <ul class="flex flex-col">
            <sidebar-item
              icon=""
              label="Celkem přečteno"
              :readCount="booklist.total"
              maxCount="20"
            ></sidebar-item>
            <sidebar-item
              icon=""
              label="Světová a česká literatura do konce 18. století"
              :readCount="booklist.world_and_czech_pre18th_century"
              maxCount="2"
            ></sidebar-item>
            <sidebar-item
              icon=""
              label="Světová a česká literatura 19. století"
              :readCount="booklist.world_and_czech_19th_century"
              maxCount="3"
            ></sidebar-item>
            <sidebar-item
              icon=""
              label="Světová literatura 20. a 21. století"
              :readCount="booklist.world20th_and21st_century"
              maxCount="4"
            ></sidebar-item>
            <sidebar-item
              icon=""
              label="Česká literatura 20. a 21. století"
              :readCount="booklist.czech20th_and21st_century"
              maxCount="5"
            ></sidebar-item>
            <sidebar-item
              icon=""
              label="Próza"
              :readCount="booklist.prose"
              maxCount="2"
            ></sidebar-item>
            <sidebar-item
              icon=""
              label="Poezie"
              :readCount="booklist.poetry"
              maxCount="2"
            ></sidebar-item>
            <sidebar-item
              icon=""
              label="Drama"
              :readCount="booklist.drama"
              maxCount="2"
            ></sidebar-item>
            <sidebar-item
              icon=""
              label="Od jednoho autora zvolena max. 2 díla"
              type="author"
              :authors="booklist.recurring_authors"
            ></sidebar-item>
            <SidebarItemAuthorError
              v-if="booklist.recurring_authors.length > 0"
              :authors="booklist.recurring_authors"
            />
          </ul>
        </div>
      </nav>
      <SidebarGenerateBooklistButton> Vygenerovat žákovský dokument </SidebarGenerateBooklistButton>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import SidebarItem from './SidebarItem.vue'
import SidebarItemAuthorError from './SidebarItemAuthorError.vue'
import SidebarGenerateBooklistButton from './SidebarGenerateBooklistButton.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem,
    SidebarGenerateBooklistButton,
    SidebarItemAuthorError
  },
  computed: {
    booklist() {
      const store = useBookStore()
      return store.booklistAttributes
    }
  },
  mounted() {
    const store = useBookStore()
    store.getBooklistAttributes()
  }
})
</script>
