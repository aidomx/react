import { cacheMap } from '@/src/_maps'
import { CACHE_KEY_RULES } from '@/src/constants/cacheKey'
import { logWarning, resolvedPath } from '@/src/utils'
import { ActionsStore } from './actions'
import type { ActionStore, CacheRules } from '@/src/types'

/**
 * Melakukan manipulasi terhadap komponen tertentu di dalam rules.components,
 * dengan memberikan akses ke context `ActionStore`.
 *
 * Terdapat beberapa alias dari fungsi ini:
 * - `morph`
 * - `mutate`
 * - `rupa`
 * - `evolve`
 *
 * Gunakan sesuai preferensi atau konteks gaya penamaan.
 *
 * @param path - Nama dari komponen yang ingin dimanipulasi (harus sesuai dengan `component.name`).
 * @param callback - Fungsi callback async/sync yang menerima `ctx` sebagai context manipulasi.
 *
 * @example
 * ```ts
 * await morph("HeroSection", (ctx) => {
 *   ctx.update({ props: { className: "bg-black" } })
 * })
 * ```
 *
 * @returns `Promise<void>`
 *
 * @throws Warning di console jika `rules` belum diinisialisasi atau `component` tidak ditemukan.
 */
const manipulation = async (
  path: string,
  callback: (ctx: ReturnType<typeof ActionsStore>) => void | Promise<void>
): Promise<void> => {
  const rules: CacheRules = cacheMap.get(CACHE_KEY_RULES)

  if (!rules) {
    return logWarning('Rules not initialized. Please defineRules first.')
  }

  if (!rules?.root || !rules?.components) {
    return logWarning(`Please, set your components rules.`)
  }

  const component = rules.components?.some((c) => c.name === path)
  if (!component) {
    return logWarning(`Component '${path}' not found.`)
  }

  // Protection by pathname
  const allowed = resolvedPath(path, rules)
  if (!allowed)
    return logWarning(`Access to ${path} is not allowed on this route.`)

  const ctx: ActionStore = ActionsStore(path, rules)

  await callback(ctx)
}

export { manipulation as morph }
export { manipulation as mutate }
export { manipulation as rupa }
export { manipulation as evolve }
