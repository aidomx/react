// src/rules/defineRules.ts
import type { Rules } from '../types'
import {
  getInternal,
  hasInternal,
  initInternal,
  removeInternal,
  setAfterInternal,
  setBeforeInternal,
  setInternal,
} from '../utils'

export const defineRules = (rules: Rules) => {
  initInternal(rules)

  return {
    ...getInternal(),
    get: getInternal,
    set: setInternal,
    has: hasInternal,
    remove: removeInternal,
    setAfter: setAfterInternal,
    setBefore: setBeforeInternal,
  }
}
