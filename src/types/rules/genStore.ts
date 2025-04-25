import type { CacheRules } from '.'
import type { DataObject } from '../shared'

export type ActionStore = {
  add: AddStore
  get: GetStore
  update: UpdateStore
  remove: RemoveStore
  reset: ResetStore
}

export type UpdateStoreProps = (
  prev: DataObject
) => Promise<DataObject> | DataObject

export type GetStoreProps = {
  select?: Record<string, boolean>
}

/**
 * Tipe untuk fungsi yang digunakan untuk menambah data ke store.
 */
export type AddStore = (data: DataObject) => Promise<void>

/**
 * Tipe untuk fungsi yang digunakan untuk mengambil data dari store.
 */
export type GetStore = (props: GetStoreProps) => Promise<DataObject[]>

/**
 * Tipe untuk fungsi yang digunakan untuk menghapus data dari store.
 */
export type RemoveStore = (id: string) => Promise<CacheRules>

/**
 * Tipe untuk fungsi yang digunakan untuk memperbarui data yang ada dalam store.
 */
export type UpdateStore = (
  id: string,
  cb: UpdateStoreProps
) => Promise<CacheRules>

/**
 * Tipe untuk fungsi yang digunakan untuk mereset store ke kondisi awal.
 */
export type ResetStore = () => Promise<CacheRules>

/**
 * Tipe untuk store yang berisi fungsi-fungsi dasar seperti add, get, update, remove, dan reset.
 * Store ini bertanggung jawab untuk mengelola state dan data dalam aplikasi.
 */
export type ManipulateCallback = (ctx: ActionStore) => void | Promise<void>

export type StoreManipulator = (
  pathId: string,
  cb: ManipulateCallback
) => void | Promise<void>

export type GenStore = {
  morph: StoreManipulator
  mutate: StoreManipulator
  evolve: StoreManipulator
  rupa: StoreManipulator
}
