'use client'

import { Aidomx } from '@/providers/Aidomx'
import dashboard from '@/rules/components/dashboard'
import { useEffect, useRef, useState } from 'react'

export default function About() {
  const start = useRef(performance.now())
  const [renderTime, setRenderTime] = useState('')
  const [interactTime, setInteractTime] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const end = performance.now()
    setRenderTime((end - start.current).toFixed(2) + 'ms')

    const interactStart = performance.now()
    const interactEnd = performance.now()
    setInteractTime((interactEnd - interactStart).toFixed(2) + 'ms')

    setMounted(true)
  }, [])

  if (!mounted) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-4 text-gray-500">
        <div>Waktu render: {renderTime}</div>
        <div>Waktu interaksi: {interactTime}</div>
      </div>
      <Aidomx name="container" scope={{ dashboard }} />
    </div>
  )
}
