// File: types/rules.ts
import type { Component } from './component'

export type Rules = {
  /** Daftar komponen untuk dirender */
  components?: Component[]

  /** Selector root utama, contoh: #app atau body */
  root?: string
} & Component
