import { Book, BooklistAttributes, Author, Country } from '@/types'
import { defineStore } from 'pinia'
import bookService from '@/api/bookService'
import { AxiosResponse } from 'axios'

const handleApiCall = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>,
  onSuccess: (response: AxiosResponse<T>) => void
) => {
  try {
    const response = await apiCall()
    onSuccess(response)
  } catch (error) {
    console.error('Error:', error)
  }
}

export const useBookStore = defineStore('bookStore', {
  state: () => {
    const initialBooklistAttributes: BooklistAttributes = {
      world_and_czech_pre18th_century: 0,
      world_and_czech_19th_century: 0,
      world20th_and21st_century: 0,
      czech20th_and21st_century: 0,
      prose: 0,
      poetry: 0,
      drama: 0,
      total: 0,
      recurring_authors: [] as string[]
    }

    return {
      books: [] as Book[],
      authors: [] as Author[],
      countries: [] as Country[],
      booklistAttributes: { ...initialBooklistAttributes },
      initialBooklistAttributes,
      bookFormOpen: false,
      bookEditFormOpen: false,
      deleteWarnOpen: false,
      searchParam: '',
      bookSlug: ''
    }
  },
  actions: {
    async getBooks() {
      await handleApiCall(
        () => bookService.getBooks(),
        (response) => {
          this.books = response.data
        }
      )
    },

    setCurrentBookSlug(slug: string) {
      this.bookSlug = slug
    },

    resetBookSlug() {
      this.bookSlug = ''
    },

    getReadBooks() {
      const readBooks = this.books.filter((book) => book.is_read_by_user === true)
      return readBooks
    },

    async getCountries() {
      await handleApiCall(
        () => bookService.getCountries(),
        (response) => {
          this.countries = response.data
        }
      )
    },

    async getAuthors() {
      await handleApiCall(
        () => bookService.getAuthors(),
        (response) => {
          this.authors = response.data
        }
      )
    },

    async markBookAsRead(slug: string) {
      await handleApiCall(
        () => bookService.markBook(slug),
        () => {
          const book = this.books.find((book) => book.slug === slug)
          if (book) {
            book.is_read_by_user = !book.is_read_by_user
          }
          this.getBooklistAttributes()
        }
      )
    },

    async getBooklistAttributes() {
      await handleApiCall(
        () => bookService.getBooklistAttributes(),
        (response) => {
          this.booklistAttributes = response.data
        }
      )
    },
    resetBooklistAttributes() {
      this.booklistAttributes = { ...this.initialBooklistAttributes }
    },

    async postBook(book: Partial<Book>) {
      await handleApiCall(
        () => bookService.postBook(book),
        () => {
          this.getBooks()
        }
      )
    },

    async editBook(book: Partial<Book>) {
      await handleApiCall(
        () => bookService.editBook(this.bookSlug, book),
        () => {
          this.getBooks()
          this.resetBookSlug()
        }
      )
    },

    async deleteBook() {
      await handleApiCall(
        () => bookService.deleteBook(this.bookSlug),
        () => {
          this.getBooks()
          this.resetBookSlug()
        }
      )
    },

    async updateStore() {
      await this.getBooks()
      await this.getAuthors()
      await this.getBooklistAttributes()
      await this.getCountries()
    }
  }
})
