import { defineStore } from 'pinia'
import { useBookStore } from './bookStore'
import { Book } from '@/types'

export const useBookSearchStore = defineStore('bookSearchStore', {
  state: () => {
    return {
      displayedBooks: [] as Book[],
      searchParam: '',
      prose: false,
      poetry: false,
      drama: false,
      isCzech: false,
      preEighteenthCentury: false,
      nineteenthCentury: false,
      postTwentiethCentury: false
    }
  },
  actions: {
    filterBooks() {
      const store = useBookStore()
      const books: Book[] = store.books

      let filteredBooks = books.filter((book) => {
        const searchText = this.searchParam.toLowerCase()
        return (
          book.title_name.toLowerCase().includes(searchText) ||
          book.author_name.toLowerCase().includes(searchText)
        )
      })

      if (this.prose || this.poetry || this.drama) {
        filteredBooks = filteredBooks.filter((book) => {
          return (
            (this.prose && book.literary_type === 'Próza') ||
            (this.poetry && book.literary_type === 'Poezie') ||
            (this.drama && book.literary_type === 'Drama')
          )
        })
      }

      if (this.isCzech) {
        filteredBooks = filteredBooks.filter((book) => {
          return book.country === 'Česko' || book.country === 'isCzech'
        })
      }

      if (this.preEighteenthCentury || this.nineteenthCentury || this.postTwentiethCentury) {
        filteredBooks = filteredBooks.filter((book) => {
          const year = book.publish_year
          return (
            (this.preEighteenthCentury && year < 1800) ||
            (this.nineteenthCentury && year >= 1800 && year < 1900) ||
            (this.postTwentiethCentury && year >= 1900)
          )
        })
      }

      this.displayedBooks = filteredBooks.length > 0 ? filteredBooks : books
      console.log('filtered books called', this.displayedBooks)
    }
  }
})
