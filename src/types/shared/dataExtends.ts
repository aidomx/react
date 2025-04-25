import type { DataBounds } from './data'

/**
 * DataExtends digunakan untuk fallback fungsi bawaan dari `Rules` yaitu:
 * `onList(data: DataExtends) {...}`
 *
 * `DataExtends` akan mengembalikan sebuah object seperti :
 * - state (DataObject)
 * - createNestedList
 * - dan beberapa fungsi lain yang akan didukung.
 *
 * @type object
 */
export type DataExtends<T = DataBounds> = T & ReturnType<typeof fnList>
