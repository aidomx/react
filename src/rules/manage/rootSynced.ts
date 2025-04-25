import { cacheMap, rulesProps } from '@/src/_maps'
import { HTMLFilterProps } from '@/src/security'
import type { Rules } from '@/src/types'
import { pickRulesProps, shallowEqual } from '@/src/utils'

/**
 * Menerapkan rules dari objek `Rules` ke komponen root yang memiliki nama spesifik.
 * Cocok digunakan untuk layout utama atau komponen yang berperan sebagai entry point dalam struktur Aidomx.
 *
 * Proses:
 * - Memastikan nama sesuai dengan `rules.root`.
 * - Mengambil properti yang diizinkan dari rules (berdasarkan `rulesProps`).
 * - Memfilter properti tersebut melalui `HTMLFilterProps`.
 * - Menyimpan hasil terakhir ke cache jika terdapat perubahan.
 *
 * @param rules - Objek rules yang sudah didefinisikan melalui `defineRules`.
 * @param name - Nama komponen root yang ingin dikenakan aturan.
 * @returns Object props hasil filter yang siap diberikan ke komponen.
 */
export function rootSynced(rules: Rules, name: string) {
  if (!rules || rules.root !== name) return {}

  const selected = pickRulesProps(rules, rulesProps)
  const filtered = HTMLFilterProps(selected)

  const prev = cacheMap.get(name)
  if (prev && !shallowEqual(prev, filtered)) {
    cacheMap.set(name, filtered)
    return filtered
  }

  return filtered
}
