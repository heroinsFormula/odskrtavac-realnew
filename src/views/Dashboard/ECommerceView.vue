<script setup lang="ts">
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import ChartOne from '@/components/Charts/ChartOne.vue'
import ChartThree from '@/components/Charts/ChartThree.vue'
import ChartTwo from '@/components/Charts/ChartTwo.vue'
import ChatCard from '@/components/ChatCard.vue'
import MapOne from '@/components/Maps/MapOne.vue'
import TableOne from '@/components/Tables/TableOne.vue'
import BookTable from '@/components/Tables/BookTable.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ButtonDefault from '@/components/Buttons/ButtonAddBook.vue'
import FormAddBook from '@/components/Forms/FormAddBook.vue'
import FormEditBook from '@/components/Forms/FormEditBook.vue'
import FormDeleteBook from '@/components/Forms/FormDeleteBook.vue'
import { useBookStore } from '@/stores/bookStore'
import { useUserStore } from '@/stores/userStore'
</script>

<template>
  <DefaultLayout>
    <!-- ====== Table One Start -->
    <div>
      <ButtonDefault v-if="useUserStore().isAdmin">+Přidat knihu</ButtonDefault>
    </div>
    <template v-if="useBookStore().bookFormOpen">
      <FormAddBook />
    </template>
    <template v-if="useBookStore().bookEditFormOpen">
      <FormEditBook />
    </template>
    <template v-if="useBookStore().deleteWarnOpen">
      <FormDeleteBook />
    </template>
    <div class="col-span-12 xl:col-span-8">
      <BookTable />
    </div>
    <!-- ====== Table One End -->
  </DefaultLayout>
</template>
