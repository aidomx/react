// File: types/shared.ts
import type { Rules } from './rules'
export type DataObject = Record<string, any>

export type Data = Rules | Record<string, string>

export type Filters = {
  /** Nama component */
  name: string
  /** Sembunyikan secara otomatis, default: `false` */
  autohide?: boolean
}

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

export type OnListHandler<T = any> = (
  data: T
) => VoidTypeState | ReturnTypeState

export type OnStateHandler<T = any> = (
  data: T
) => VoidTypeState | ReturnTypeState

export type ReturnTypeState<T = any> = {
  get: () => T
  set: (state: Partial<T>) => void
}

export type VoidTypeState<T = any> = (data: T) => void
