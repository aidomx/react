import type { Rules } from '../types'
import { HTMLFilterProps } from './HTMLFilterProps'
import { shallowEqual } from './shallowEqual'

export const cacheMap = new Map<string, any>()
/**
 * Menerapkan rules ke komponen berdasarkan name.
 * Digunakan untuk Aidomx (layout) atau komponen lain yang punya name.
 */
export function ApplyRules(rules: Rules, name: string) {
  if (!rules || rules.root !== name) return {}

  const { className, style, onClick, onMouseEnter, onMouseLeave, ...rest } =
    rules

  const filtered = HTMLFilterProps({
    className,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...rest,
  })

  const prev = cacheMap.get(name)
  if (prev && !shallowEqual(prev, filtered)) {
    cacheMap.set(name, filtered)
  }

  return filtered
}
