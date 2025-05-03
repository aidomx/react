'use client'

type Props = {
  name: string
}

export const NotFound = ({ name }: Props) => {
  return (
    <div id={name} className="text-center text-gray-400 py-10">
      <h2 className="text-lg font-semibold">No components found</h2>
      <p>Please check your entries or scope configuration.</p>
    </div>
  )
}
