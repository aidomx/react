import type { DataBounds, Filters, Skeleton } from '../shared'

export type Component = {
  /** Nama class CSS */
  className?: string

  /** Data yang akan digunakan */
  data?: DataBounds

  filters?: Filters

  /** Properti tambahan lainnya */
  [key: string]: any

  /** Nama internal atau identifier dari komponen */
  name?: string

  /** Type dari komponen */
  type?: string

  /** Skeleton UI jika ingin delay render */
  skeleton?: Skeleton

  /** Gaya inline CSS dalam bentuk objek */
  style?: Record<string, string>

  /** Nama tag HTML, contoh: div, span, button */
  tagName?: string

  /** Konten teks dalam komponen */
  text?: string
}
