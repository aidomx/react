import type { Rules } from '../types'

/**
 * Memilih properti dari objek `rules` berdasarkan daftar properti yang diberikan.
 *
 * @param rules - Objek yang berisi properti yang akan dipilih.
 * @param propsList - Daftar nama properti yang ingin dipilih dari objek `rules`.
 * @returns `{Record<string, any>}` - Objek baru yang hanya berisi properti yang dipilih.
 *
 * @example
 * ```ts
 * const rules = { className: 'container', style: { color: 'red' }, onClick: () => {} }
 * const selectedProps = pickRulesProps(rules, ['className', 'style'])
 * // Hasil: { className: 'container', style: { color: 'red' } }
 * ```
 */
export const pickRulesProps = (rules: Rules, propsList: string[]) => {
  return propsList.reduce((result: Record<string, any>, propName: string) => {
    if (rules[propName] !== undefined) {
      result[propName] = rules[propName]
    }
    return result
  }, {})
}
