import { Book, BooklistAttributes } from '@/types';
import { defineStore } from 'pinia';
import { bookService } from '@/api/bookService';

const normalizeString = (str: string): string =>
  str
    .toLowerCase()
    .normalize('NFD') // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics



export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [] as Book[],           // All books
    filteredBooks: [] as Book[],   // Books after filtering
    booklistAttributes: {} as BooklistAttributes,
    searchQuery: '',              // Current search query
  }),
  actions: {
    async getBooks() {
      try {
        const response = await bookService.getBooks();
        this.books = response.data;
        this.filteredBooks = response.data; // Initialize filteredBooks with all books
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

    setSearchQuery(newQuery: string) {
      this.searchQuery = newQuery;
      this.filterBooks(this.searchQuery);
    },

    filterBooks(searchQuery: string) {
      const normalizedQuery = normalizeString(searchQuery);

      this.filteredBooks = this.books.filter((book) => {
        return (
          // normalizeString(book.author.full_name).includes(normalizedQuery) ||
          normalizeString(book.title_name).includes(normalizedQuery) ||
          normalizeString(book.country).includes(normalizedQuery) ||
          normalizeString(book.literary_type).includes(normalizedQuery) ||
          normalizeString(book.publish_year.toString()).includes(normalizedQuery)
        );
      });
    },
  },
});
