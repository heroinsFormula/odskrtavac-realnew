import { Book, BooklistAttributes } from '@/types'
import { defineStore } from 'pinia'
import { bookService } from '@/api/bookService'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [] as Book[],
    booklistAttributes: {
      world_and_czech_pre18th_century: 0,
      world_and_czech_19th_century: 0,
      world20th_and21st_century: 0,
      czech20th_and21st_century: 0,
      prose: 0,
      poetry: 0,
      drama: 0,
      total: 0,
      recurring_authors: []
    } as BooklistAttributes
  }),
  actions: {
    async getBooks() {
      try {
        const response = await bookService.getBooks()
        console.log(response)
        this.books = response.data
        return response
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    },

    async markBookAsRead(slug: string) {
      try {
        const book = this.books.find((book) => book.slug === slug)
        if (book) {
          book.is_read_by_user = !book.is_read_by_user
        }
        this.getBooklistAttributes()
      } catch (error) {
        console.error('Error marking book:', error)
      }
    },

    async getBooklistAttributes() {
      try {
        const response = await bookService.getBooklistAttributes()
        this.booklistAttributes = response.data
        return response
      } catch (error) {
        console.error(error)
      }
    }
  }
})
