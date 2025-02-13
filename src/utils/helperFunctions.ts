import { Book } from '@/types'

/**
 * Slouží k hledání podle jakýhokoliv parametru
 * User může hledat podle jména knihy, autora, země...
 * Zdroj - https://stackoverflow.com/questions/44312924/filter-array-of-objects-whose-any-properties-contains-a-value
 */
type FilterableBook = Pick<Book, 'title_name' | 'country' | 'literary_type' | 'author_name'>

export default function filterByValue(array: Array<FilterableBook>, string: String) {
  return array.filter((o) =>
    (Object.keys(o) as Array<keyof FilterableBook>).some((k) =>
      o[k].toLowerCase().includes(string.toLowerCase())
    )
  )
}
