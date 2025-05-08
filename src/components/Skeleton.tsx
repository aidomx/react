'use client'

import type { SkeletonProps } from '@/types'

export const SkeletonUI = ({ name, skeleton }: SkeletonProps) => {
  if (!skeleton?.status) return null

  return (
    <div id={name} className={skeleton?.className}>
      <h2 className="text-lg font-semibold">Loading...</h2>
      <p>{skeleton?.content ?? 'Preparing ghost components...'}</p>
    </div>
  )
}
