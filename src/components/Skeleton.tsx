import type { Skeleton } from '@aidomx/core'

type Props = {
  name: string
  skeleton?: Skeleton
}

export const SkeletonUI = ({ name, skeleton }: Props) => {
  if (!skeleton?.status) return null

  return (
    <div id={name} className="text-center text-gray-400 py-10 h-screen">
      <h2 className="text-lg font-semibold">Loading...</h2>
      <p>{skeleton?.content}</p>
    </div>
  )
}
