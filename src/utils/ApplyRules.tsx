import type { Rules } from '../types'

/**
 * Menerapkan rules ke komponen berdasarkan name.
 * Digunakan untuk Aidomx (layout) atau komponen lain yang punya name.
 */
export function ApplyRules(rules: Rules, name: string) {
  if (!rules || rules.root !== name) return {}

  const { className, style, onClick, onMouseEnter, onMouseLeave, ...rest } =
    rules

  return {
    className,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...rest,
  }
}
