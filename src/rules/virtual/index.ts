import { cacheMap } from '@/src/_maps'
import { CACHE_KEY_RULES } from '@/src/constants/cacheKey'
import type { Rules, VirtualApi } from '@/src/types'
import { logWarning } from '@/src/utils'
import { ActionsVirtual } from './actions'

const generateVirtual = (): VirtualApi => {
  const cached = cacheMap.get(CACHE_KEY_RULES)

  return { ...ActionsVirtual(cached) }
}

export const createVirtual = (
  rules: Rules
): ReturnType<typeof generateVirtual> => {
  const isValidRules = validateRules(rules)

  if (!isValidRules) {
    return {} as VirtualApi
  }

  return generateVirtual()
}

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
