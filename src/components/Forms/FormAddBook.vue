<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <DefaultCard
      cardTitle="Přidat knihu"
      class="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
    >
      <form @submit.prevent="handleSubmit" class="">
        <div class="p-6.5">
          <InputGroup
            v-model="titleName"
            label="Jméno knihy"
            type="text"
            placeholder="Zadejte jméno titul"
            required
          />

          <DefaultSelect
            v-model="authorName"
            :label="'Jméno autora'"
            :placeholder="'Vyberte autora'"
            :options="authorOptions"
            required
          />

          <InputGroup
            v-model="publishYear"
            label="Rok vydání"
            type="number"
            placeholder="Zadejte rok vydání"
            required
          />

          <DefaultSelect
            v-model="country"
            :label="'Země původu'"
            :placeholder="'Vyberte zemi'"
            :options="countryOptions"
            required
          />

          <DefaultSelect
            v-model="literaryType"
            :label="'Literární druh'"
            :placeholder="'Vyberte literární druh'"
            :options="literaryTypeOptions"
            required
          />

          <div class="mb-6">
            <label class="mb-2.5 block text-black dark:text-white"> Popis knihy </label>
            <textarea
              v-model="message"
              rows="6"
              placeholder="Type your message"
              class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>

          <button
            type="submit"
            class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Send Message
          </button>
        </div>
      </form>
    </DefaultCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import DefaultSelect from './SelectGroup/DefaultSelect.vue'
import { useBookStore } from '@/stores/bookStore.ts'
import bookService from '@/api/bookService'
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
  data() {
    return {
      titleName: '',
      authorName: '',
      publishYear: null as number | null,
      country: '',
      literaryType: '',
      message: ''
    }
  },
  computed: {
    literaryTypeOptions() {
      return literaryTypeOptions
    },

    authorOptions() {
      const store = useBookStore()
      return store.authors.map((author: Author) => author.full_name)
    },

    countryOptions() {
      const store = useBookStore()
      return store.countries.map((country: Country) => country.name)
    }
  },
  methods: {
    validateData() {
      if (
        !this.titleName ||
        !this.authorName ||
        !this.publishYear ||
        !this.country ||
        !this.literaryType
      ) {
        return false
      }
      return true
    },
    prepareData() {
      const authorName = this.authorName
      const bookData: Book = {
        title_name: this.titleName,
        author: authorName,
        publish_year: this.publishYear as number,
        country: this.country,
        literary_type: this.literaryType
      }
      return bookData
    },

    handleSubmit() {
      if (this.validateData()) {
        const data = this.prepareData()
        console.log(data)
        bookService.postBook(data)
      } else {
        return 'problééééém'
      }
    }
  }
})
</script>
