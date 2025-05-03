'use client'

import type { SkeletonProps } from '@/types'

export const SkeletonUI = ({ name, skeleton }: SkeletonProps) => {
  if (!skeleton?.status) return null

  return (
    <div id={name} className="text-center text-gray-400 py-10 h-screen">
      <h2 className="text-lg font-semibold">Loading...</h2>
      <p>{skeleton?.content}</p>
    </div>
  )
}
