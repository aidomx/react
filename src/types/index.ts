//!src/types/ui.ts

/**
 * Jenis data utama yang digunakan untuk menyimpan state atau konten.
 * Bisa berupa object tunggal atau array of objects.
 */
export type DataObject = Record<string, any>

/**
 * Tipe data campuran antara aturan lengkap (Rules)
 * atau data key-value sederhana.
 */
export type Data = Rules | Record<string, string>

/**
 * Struktur komponen UI yang dapat dirender atau dibentuk.
 */
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
  posAfter?: boolean

  /** Posisi render sebelum elemen lain */
  posBefore?: boolean

  /** Skeleton UI jika ingin delay render */
  skeleton?: Skeleton

  /** Gaya inline CSS dalam bentuk objek */
  style?: Record<string, string>

  /** Nama tag HTML, contoh: div, span, button */
  tagName?: string

  /** Konten teks dalam komponen */
  text?: string
}

/**
 * Filter digunakan untuk menyembunyikan komponen tertentu.
 */
export type Filters = {
  /** Nama component */
  name: string

  /** Sembunyikan secara otomatis, default: `false` */
  autohide?: boolean
}

/**
 * Handler untuk `onList()` — digunakan untuk list spesifik
 *
 * @return tipe `voidTypeState` atau `returnTypeState`
 */
export type OnListHandler<T = any> = (
  data: T
) => voidTypeState | returnTypeState

/**
 * Handler untuk `onState()` — digunakan untuk state global
 *
 * @return tipe `voidTypeState` atau `returnTypeState`
 */
export type OnStateHandler<T = any> = (
  data: T
) => voidTypeState | returnTypeState

/**
 * Struktur aturan atau template UI secara keseluruhan.
 */
export type Rules = {
  /** Daftar komponen untuk dirender */
  components?: Component[]

  /** Selector root utama, contoh: #app atau body */
  root?: string
} & Component

/**
 * Struktur skeleton UI yang ditampilkan sebelum konten utama.
 */
export type Skeleton = {
  /** ClassName CSS custom untuk skeleton */
  className?: string

  /** Aktifkan skeleton UI */
  enable: boolean

  /** Nama skeleton component (optional) */
  name?: string

  /** Inline style untuk skeleton */
  style?: Record<string, any>
}

/**
 * Handler yang mengembalikan state manager:
 * - `get()` untuk mengambil state
 * - `set()` untuk memperbarui sebagian state
 */
export type returnTypeState<T = any> = {
  get: () => T
  set: (state: Partial<T>) => void
}

/**
 * Handler sederhana untuk perubahan state (tanpa get)
 */
export type voidTypeState<T = any> = (data: T) => void
