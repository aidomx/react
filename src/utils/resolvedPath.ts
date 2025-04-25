import type { CacheRules } from '../types'
import { normalizeRules } from './normalizeRules'

export const resolvedPath = (name: string, rules: CacheRules): boolean => {
  if (typeof window !== 'undefined' && rules?.routes) {
    if (Array.isArray(rules.routes)) return false

    const routes = normalizeRules(rules.routes)
    return routes.some(
      (route) =>
        route.name.includes(name) && route.pathname === window.location.pathname
    )
  }

  return false
}
