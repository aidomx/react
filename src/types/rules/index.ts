import type { DeepReadonly } from '../helpers/deepReadOnly'
import type { Component } from './structure'

/**
 * Base rules
 *
 * Bersifat lokal sebagai bagian dari Rules
 *
 * @type object
 */
export type Base = {
  /** Daftar komponen untuk dirender */
  components?: Component[]

  /** Selector root utama, contoh: #app atau body */
  root?: string | ''

  /** Routes */
  routes?:
    | Record<string, string[]>
    | {
        pathname: string
        name: string[]
      }[]
}

/**
 * Rules Based
 *
 * Sebuah aturan untuk mendefinisikan berbagai komponen.
 *
 * @type object
 */
export type Rules = DeepReadonly<Base & Component>

export type CacheRules = Base & Component

//- Re-export
export type * from './structure'
export type * from './genStore'
export type * from './virtual'
