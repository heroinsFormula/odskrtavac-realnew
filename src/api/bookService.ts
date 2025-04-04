import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Author, Book, BooklistAttributes, Country } from '@/types'

function getAccessToken(): string {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    throw new Error('No access token found. Please log in.')
  }
  return token
}

const makeAuthenticatedRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any
): Promise<AxiosResponse<T>> => {
  try {
    const accessToken = getAccessToken()
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }

    if (method === 'get') {
      return await axios.get<T>(url, config)
    } else if (method === 'post') {
      return await axios.post<T>(url, data, config)
    } else if (method === 'put') {
      return await axios.put<T>(url, data, config)
    } else if (method === 'delete') {
      return await axios.delete<T>(url, config)
    }

    throw new Error(`Unsupported HTTP method: ${method}`)
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}

export const getBooks = () => {
  return makeAuthenticatedRequest<Book[]>('get', 'book-api/get-books/')
}

export const getAuthors = () => {
  return makeAuthenticatedRequest<Author[]>('get', 'book-api/get-authors/')
}

export const postBook = (newBook: Partial<Book>) => {
  return makeAuthenticatedRequest<Book>('post', 'book-api/post-book/', newBook)
}

export const editBook = (slug: string, bookData: Partial<Book>) => {
  return makeAuthenticatedRequest<Book>('put', `book-api/edit-book/${slug}/`, bookData)
}

export const markBook = (slug: string) => {
  return makeAuthenticatedRequest<void>('post', `book-api/mark-read/${slug}/`, {})
}

export const getBooklistAttributes = () => {
  return makeAuthenticatedRequest<BooklistAttributes>('get', 'book-api/get-booklist-attributes/')
}

export const getCountries = () => {
  return makeAuthenticatedRequest<Country[]>('get', 'book-api/get-countries/')
}

export const deleteBook = (slug: string) => {
  return makeAuthenticatedRequest<Book>('delete', `book-api/delete-book/${slug}/`)
}

const bookService = {
  getBooks,
  getAuthors,
  postBook,
  editBook,
  deleteBook,
  markBook,
  getBooklistAttributes,
  getCountries
}

export default bookService
