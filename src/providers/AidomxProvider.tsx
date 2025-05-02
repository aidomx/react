'use client'

import { ReactNode, useContext } from 'react'
import { AidomxContext } from './AidomxContext'
import { defineRules, RULES_SECRET_KEY, type Rules } from '@aidomx/core'

type Props = {
  children: ReactNode
  value: Rules
}

export const AidomxProvider = ({ children, value }: Props) => {
  if (!RULES_SECRET_KEY) return <>{children}</>

  return (
    <AidomxContext.Provider value={value}>{children}</AidomxContext.Provider>
  )
}

export const useAidomx = (): Rules => {
  const ctx = useContext(AidomxContext)

  if (!ctx) {
    console.warn('[Aidomx] No context provider!')
  }

  return defineRules(ctx)
}
