'use client'

import { ReactNode, useContext } from 'react'
import { AidomxContext } from './AidomxContext'
import type { Rules } from 'aidomx'
import { Aidomx } from './Aidomx'

type Props = {
  children: ReactNode
  value: Rules | Record<string, string>
}

export const AidomxProvider = ({ children, value }: Props) => {
  return (
    <AidomxContext.Provider value={value}>
      <Aidomx>{children}</Aidomx>
    </AidomxContext.Provider>
  )
}

export const useAidomx = () => {
  const ctx = useContext(AidomxContext)
  if (!ctx) {
    console.warn('[Aidomx] No context')
  }

  return ctx
}
