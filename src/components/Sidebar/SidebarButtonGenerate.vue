<template>
  <div class="flex justify-center mb-5">
    <button
      class="group relative flex items-center justify-center gap-1 py-2 px-3 bg-white font-medium text-boxdark-2 duration-100 ease-in rounded-lg hover:bg-gray-300 hover:text-boxdark-1"
      @click="handleGeneratePrompt"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'
import { Author, Book } from '@/types'

export default defineComponent({
  name: 'SidebarGenerateBooklistButton',
  setup() {
    const bookStore = useBookStore()

    function getCurrentDateFormatted() {
      const today = new Date()
      const day = String(today.getDate()).padStart(2, '0') // 2-ciferné
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = today.getFullYear()

      return `${day}.${month}.${year}`
    }

    const generateDocument = async () => {
      try {
        const readBooks = bookStore.getReadBooks()
        const data = {
          books: readBooks.map((book) => ({
            author: book.author.full_name ? book.author.full_name : 'Neznámý',
            title: book.title_name
          })),

          date: getCurrentDateFormatted()
        }
        const response = await fetch('/odskrtavac-realnew/template.docx')
        const template = await response.arrayBuffer()

        const zip = new PizZip(template)
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true
        })

        doc.setData(data)

        doc.render()

        const blob = doc.getZip().generate({ type: 'blob' })

        saveAs(blob, 'žákovský-dokument.docx')
      } catch (error) {
        console.error('Error generating document:', error)
      }
    }

    const handleGeneratePrompt = async () => {
      // if (!bookStore.checkBooklist()) {
      //   console.log('blbost...')
      //   return
      // }
      generateDocument()
    }

    return {
      handleGeneratePrompt
    }
  }
})
</script>
