// src/utils/isSkeletonEnabled.ts
import type { Rules } from '../types'

// Caching skeleton state untuk menghindari pengecekan berulang
const skeletonCache = new Map<string, boolean>()

export const isSkeletonEnabled = (rules: Rules, name: string): boolean => {
  // Jika sudah ada di cache, return hasilnya
  if (skeletonCache.has(name)) return skeletonCache.get(name)!

  const rootSkeleton = rules?.skeleton?.enable
  const component =
    rules?.components && rules?.components?.find((c) => c.name === name)
  const componentSkeleton = component?.skeleton?.enable

  const result = !!(componentSkeleton || rootSkeleton)
  // Simpan hasil pengecekan di cache
  skeletonCache.set(name, result)

  return result
}

export const getSkeletonProps = (rules: Rules, name: string) => {
  const component =
    rules?.components && rules?.components?.find((c) => c.name === name)
  const sk = component?.skeleton ?? rules?.skeleton

  // Pastikan jika skeleton diaktifkan, className tidak mengandung animate-pulse
  return {
    className: sk?.className ?? '', // Hapus animate-pulse
    style: sk?.style,
  }
}
