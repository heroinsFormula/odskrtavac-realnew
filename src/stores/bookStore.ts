import { Book, BooklistAttributes } from '@/types';
import { defineStore } from 'pinia';
import { bookService } from '@/api/bookService';

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [] as Book[],
    booklistAttributes: {} as BooklistAttributes,
  }),
  actions: {
    async getBooks() {
      try {
        const response = await bookService.getBooks();
        console.log(response)
        this.books = response.data;
        return response;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },

    async markBookAsRead(slug: string) {
      try {
        const book = this.books.find((book) => book.slug === slug);
        if (book) {
          book.is_read_by_user = !book.is_read_by_user;
        }
        this.getBooklistAttributes();
      } catch (error) {
        console.error('Error marking book:', error);
      }
    },

    async getBooklistAttributes() {
      try {
        const response = await bookService.getBooklistAttributes();
        this.booklistAttributes = response.data;
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
