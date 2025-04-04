<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <DefaultCard
      cardTitle="Upravit knihu"
      class="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
    >
      <form @submit.prevent="handleSubmit" class="">
        <div class="p-6.5">
          <InputGroup
            v-model="formData.titleName"
            label="Jméno knihy"
            type="text"
            placeholder="Zadejte jméno titul"
            required
          />

          <DefaultSelect
            v-model="formData.authorName"
            :label="'Jméno autora'"
            :placeholder="'Vyberte autora'"
            :options="authorOptions"
            required
          />

          <InputGroup
            v-model="formData.publishYear"
            label="Rok vydání"
            type="number"
            placeholder="Zadejte rok vydání"
            required
          />

          <DefaultSelect
            v-model="formData.country"
            :label="'Země původu'"
            :placeholder="'Vyberte zemi'"
            :options="countryOptions"
            required
          />

          <DefaultSelect
            v-model="formData.literaryType"
            :label="'Literární druh'"
            :placeholder="'Vyberte literární druh'"
            :options="literaryTypeOptions"
            required
          />

          <div class="mb-6">
            <label class="mb-2.5 block text-black dark:text-white"> Popis knihy </label>
            <textarea
              v-model="formData.description"
              rows="6"
              placeholder="Zadejte popis knihy"
              class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>

          <button
            type="submit"
            class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Uložit změny
          </button>
        </div>
      </form>
    </DefaultCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch } from 'vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import DefaultSelect from './SelectGroup/DefaultSelect.vue'
import { useBookStore } from '@/stores/bookStore.ts'
import { Author, Book, Country } from '@/types'

const literaryTypeOptions = {
  prose: 'Próza',
  poetry: 'Poezie',
  drama: 'Drama'
}

export default defineComponent({
  components: {
    InputGroup,
    DefaultCard,
    DefaultSelect
  },
  setup() {
    const store = useBookStore()

    const formData = reactive({
      titleName: '',
      authorName: '',
      publishYear: null as number | null,
      country: '',
      literaryType: '',
      description: ''
    })

    // Prefill form when bookSlug changes or form opens
    const prefillForm = () => {
      if (store.bookSlug && store.bookEditFormOpen) {
        const bookToEdit = store.books.find((book) => book.slug === store.bookSlug)
        if (bookToEdit) {
          formData.titleName = bookToEdit.title_name
          formData.authorName = bookToEdit.author.full_name
          formData.publishYear = bookToEdit.publish_year
          formData.country = bookToEdit.country
          formData.literaryType = bookToEdit.literary_type
          formData.description = bookToEdit.description || ''
        }
      }
    }

    // Watch for changes in bookSlug and form open state
    watch(
      () => [store.bookSlug, store.bookEditFormOpen],
      () => prefillForm(),
      { immediate: true }
    )

    const authorOptions = computed(() => {
      return store.authors.map((author: Author) => author.full_name)
    })

    const countryOptions = computed(() => {
      return store.countries.map((country: Country) => country.name)
    })

    const validateData = () => {
      return !!(
        formData.titleName &&
        formData.authorName &&
        formData.publishYear &&
        formData.country &&
        formData.literaryType
      )
    }

    const handleSubmit = async () => {
      if (!validateData()) {
        console.error('Všechna pole jsou povinná')
        return
      }

      const bookData: Partial<Book> = {
        title_name: formData.titleName,
        author: formData.authorName,
        publish_year: formData.publishYear as number,
        country: formData.country,
        literary_type: formData.literaryType,
        description: formData.description
      }

      try {
        if (store.bookSlug) {
          await store.editBook(bookData)
          store.bookEditFormOpen = false
          store.bookSlug = ''
        }
      } catch (error) {
        console.error('Chyba při ukládání:', error)
      }
    }

    return {
      formData,
      literaryTypeOptions,
      authorOptions,
      countryOptions,
      handleSubmit
    }
  }
})
</script>
