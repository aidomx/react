import { cacheMap } from '@/src/_maps'
import { CACHE_KEY_RULES } from '@/src/constants/cacheKey'
import type { GenStore, Rules } from '@/src/types'
import { logWarning } from '@/src/utils'
import { morph, mutate, evolve, rupa } from './manipulation'

/**
 * Menghasilkan objek store dasar yang berisi aksi manipulasi store.
 * Store ini bersifat generik dan bertanggung jawab atas add, get, update, remove, dan reset.
 *
 * @returns {GenStore} Store dasar dengan fungsi manipulasi data.
 */
const generateStore = (): GenStore => {
  return { ...{ morph, mutate, evolve, rupa } }
}

/**
 * Membuat store jika rules yang diberikan valid dan cocok dengan cache.
 * Digunakan dalam lingkungan runtime setelah rules diamankan.
 *
 * @param {Rules} rules - Rules yang diberikan untuk validasi dan inisialisasi.
 * @returns {GenStore} Store hasil generate jika valid, jika tidak, objek kosong.
 */
export const createStore = (rules: Rules): ReturnType<typeof generateStore> => {
  const isValidRules = validateRules(rules)

  if (!isValidRules) {
    return {} as GenStore
  }

  return generateStore()
}

/**
 * Memvalidasi apakah rules cocok dengan yang disimpan dalam cache.
 * Ini memastikan bahwa hanya rules yang diinisialisasi dengan benar yang akan digunakan untuk store.
 *
 * @param {Rules} rules - Rules yang akan divalidasi terhadap cache.
 * @returns {boolean} True jika valid dan cocok, false jika tidak.
 */
const validateRules = (rules: Rules): boolean => {
  const isReadyRules = cacheMap.has(CACHE_KEY_RULES)

  if (!isReadyRules) {
    logWarning(
      'Please, initialize with defineRules before calling createStore.'
    )
    return false
  }

  if (!('__aidomx__' in rules)) {
    logWarning(
      'Rules signature is missing. Please use defineRules to initialize rules.'
    )
    return false
  }

  if (!rules.root || !Array.isArray(rules.components)) {
    logWarning(
      'Rules structure is invalid. Expected root and components fields.'
    )
    return false
  }

  const cacheRules = cacheMap.get(CACHE_KEY_RULES)

  if (!cacheRules || cacheRules.__aidomx__ !== rules.__aidomx__) {
    logWarning('Provided rules do not match the cached rules.')
    return false
  }

  return true
}
