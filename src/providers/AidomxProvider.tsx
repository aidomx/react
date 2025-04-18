'use client'

import { ReactNode, useContext } from 'react'
import { AidomxContext } from './AidomxContext'
import { AidomxNextProvider } from './AidomxNextProvider'
import type { Rules } from '../types'

type Props = {
  children: ReactNode
  value: Rules
}

export const AidomxProvider = ({ children, value }: Props) => {
  return (
    <AidomxContext.Provider value={value}>
      <AidomxNextProvider>{children}</AidomxNextProvider>
    </AidomxContext.Provider>
  )
}

export const useAidomx = () => {
  const ctx: Rules = useContext(AidomxContext)

  if (!ctx) {
    console.warn('[Aidomx] No context provider!')
  }

  return ctx
}
