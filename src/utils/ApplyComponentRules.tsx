import type { Component } from '../types'

/**
 * Menerapkan aturan spesifik ke komponen individual berdasarkan name.
 */
export function ApplyComponentRules(rules: Component, name: string) {
  if (!rules || rules.name !== name) return {}

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
