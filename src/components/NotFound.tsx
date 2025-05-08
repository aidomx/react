'use client'

import { settings } from '@aidomx/core'
import { useEffect, useState } from 'react'

type Props = {
  name: string
}

export const NotFound = ({ name }: Props) => {
  const [lastModified, setLastModified] = useState(0)

  useEffect(() => {
    const handler = () => {
      if (lastModified !== settings.getModified()) {
        setLastModified(settings.getModified())
      }
    }
    const id = setInterval(handler, 150)
    return () => clearInterval(id)
  }, [lastModified])

  if (lastModified > 0) return null

  return (
    <div id={name} className="text-center text-gray-400 py-10">
      <h2 className="text-lg font-semibold">No components found</h2>
      <p>Please check your entries or scope configuration.</p>
    </div>
  )
}
