import { cacheMap } from '../_maps'
import { CACHE_KEY_RULES } from '../constants/cacheKey'
import { RULES_SECRET_KEY } from '../constants/rulesKey'
import type { CacheRules, Rules } from '../types'
import { logWarning, normalizeRules, resolvedPath } from '../utils'

/**
 * Membekukan dan menyimpan rules ke cacheMap,
 * lalu menginisialisasi jika autorun diaktifkan.
 */
export const secureRules = (rules: Rules): Rules => {
  const secretKey = RULES_SECRET_KEY

  if (!secretKey) {
    logWarning('RULES_SECRET_KEY is not defined. Rules were not secured.')
    return {}
  }

  const secured = {
    ...rules,
    __aidomx__: secretKey,
  }

  cacheMap.set(CACHE_KEY_RULES, secured)

  const cacheRules: CacheRules = cacheMap.get(CACHE_KEY_RULES)

  if (process.env.NODE_ENV === 'production') {
    return Object.freeze(cacheRules)
  }

  return cacheRules
}
