// File: types/component.ts
import type {
  DataObject,
  Skeleton,
  Filters,
  OnListHandler,
  OnStateHandler,
} from './shared'

export type Component = {
  /** Nama class CSS */
  className?: string

  /** Data yang akan digunakan */
  data?: DataObject | DataObject[]

  filters?: Filters

  /** Properti tambahan lainnya */
  [key: string]: any

  /** Nama internal atau identifier dari komponen */
  name?: string

  /** Handler state untuk list spesifik */
  onList?: (data: DataObject | DataObject[]) => OnListHandler

  /** Handler state untuk global state */
  onState?: (data: DataObject | DataObject[]) => OnStateHandler

  /** Posisi render setelah elemen lain */
  posAfter?: (target: string, id: string) => void

  /** Posisi render sebelum elemen lain */
  posBefore?: (target: string, id: string) => void

  /** Skeleton UI jika ingin delay render */
  skeleton?: Skeleton

  /** Gaya inline CSS dalam bentuk objek */
  style?: Record<string, string>

  /** Nama tag HTML, contoh: div, span, button */
  tagName?: string

  /** Konten teks dalam komponen */
  text?: string
}
