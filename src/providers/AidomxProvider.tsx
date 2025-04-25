'use client'

import { ReactNode, useContext } from 'react'
import { AidomxContext } from './AidomxContext'
import { AidomxNextProvider } from './AidomxNextProvider'
import type { Rules } from '../types'
import { RULES_SECRET_KEY } from '../constants/rulesKey'

type Props = {
  children: ReactNode
  value: Rules
}

export const AidomxProvider = ({ children, value }: Props) => {
  if (!RULES_SECRET_KEY) return <>{children}</>

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
