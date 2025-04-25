import type { Rules } from '../types'

// Caching skeleton state untuk menghindari pengecekan berulang
const skeletonCache = new Map<string, boolean>()

/**
 * Hook untuk menentukan apakah skeleton harus diaktifkan
 * pada level root atau komponen tertentu berdasarkan `rules`.
 *
 * @param rules - Objek rules yang mendefinisikan konfigurasi skeleton.
 * @param name - Nama komponen yang sedang diperiksa.
 * @returns `true` jika skeleton diaktifkan, `false` jika tidak.
 */
export const SkeletonUI = (rules: Rules, name: string): boolean => {
  if (skeletonCache.has(name)) return skeletonCache.get(name)!

  const rootSkeleton = rules?.skeleton?.enable
  const component =
    rules?.components && rules?.components?.find((c) => c.name === name)
  const componentSkeleton = component?.skeleton?.enable

  const result = !!(componentSkeleton || rootSkeleton)
  skeletonCache.set(name, result)

  return result
}

/**
 * Mengambil properti `className` dan `style` untuk skeleton
 * dari rules berdasarkan komponen yang dimaksud.
 *
 * @param rules - Objek rules yang berisi konfigurasi skeleton.
 * @param name - Nama komponen untuk mengambil properti skeleton-nya.
 * @returns Objek yang berisi `className` dan `style` untuk skeleton.
 */
export const getSkeletonProps = (rules: Rules, name: string) => {
  const component =
    rules?.components && rules?.components?.find((c) => c.name === name)
  const sk = component?.skeleton ?? rules?.skeleton

  return {
    className: sk?.className ?? '',
    style: sk?.style,
  }
}
