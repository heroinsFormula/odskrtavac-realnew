<template>
  <div class="flex justify-center mb-5">
    <button
      class="group relative flex items-center justify-center gap-1 py-2 px-3 bg-white font-medium text-boxdark-2 duration-300 ease-in rounded-lg hover:bg-gray-100 hover:text-boxdark-1"
      @click="generateDocument"
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

export default defineComponent({
  name: 'SidebarGenerateBooklistButton',
  setup() {
    const bookStore = useBookStore()

    const generateDocument = async () => {
      try {
        const books = [
          { title: 'Catcher in the Rye' },
          { title: 'Of Mice and Men' },
          { title: 'To Kill a Mockingbird' }
        ]

        const data = {
          books: books.map((book, index) => ({
            index: index + 1,
            title: book.title
          }))
        }

        const response = await fetch('/odskrtavac-realnew/template.docx')
        console.log(response)
        const template = await response.arrayBuffer()
        console.log(template)

        const zip = new PizZip(template)
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true
        })

        doc.setData(data)

        doc.render()

        const blob = doc.getZip().generate({ type: 'blob' })

        saveAs(blob, 'generated-booklist.docx')
      } catch (error) {
        console.error('Error generating document:', error)
      }
    }

    return {
      generateDocument
    }
  }
})
</script>
