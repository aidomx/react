import { cacheMap, rulesProps } from '@/src/_maps'
import { HTMLFilterProps } from '@/src/security'
import { Component } from '@/src/types'
import { pickRulesProps, shallowEqual } from '@/src/utils'

/**
 * Menerapkan aturan spesifik ke komponen individual berdasarkan nama komponen.
 * Fungsi ini digunakan untuk komponen dalam aplikasi yang memerlukan penyaringan properti berdasarkan aturan yang sudah didefinisikan.
 *
 * Proses:
 * - Memastikan bahwa `rules` ada dan nama komponen sesuai dengan `rules.name`.
 * - Mengambil properti yang diizinkan dari `rules` berdasarkan daftar `rulesProps`.
 * - Memfilter properti yang dipilih menggunakan `HTMLFilterProps` untuk memastikan bahwa hanya properti yang aman yang diteruskan.
 * - Menggunakan cache untuk menghindari pengolahan ulang jika props tidak berubah secara dangkal.
 *
 * @param rules - Objek komponen yang berisi aturan dan properti terkait komponen.
 * @param name - Nama komponen yang ingin dikenakan aturan.
 * @returns Object properti yang sudah difilter dan diterapkan, siap diberikan ke komponen.
 */
export function componentsSynced(rules: Component, name: string) {
  if (!rules || rules.name !== name) return {}

  const selected = pickRulesProps(rules, rulesProps)
  const filtered = HTMLFilterProps(selected)

  const prev = cacheMap.get(name)
  if (prev && !shallowEqual(prev, filtered)) {
    cacheMap.set(name, filtered)
    return filtered
  }

  return filtered
}
