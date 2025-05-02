'use client'

import { ReactNode, useContext } from 'react'
import { AidomxContext } from './AidomxContext'
import { defineRules, RULES_SECRET_KEY, type RulesConfig } from '@aidomx/core'

type Props = {
  children: ReactNode
  value: RulesConfig
}

export const AidomxProvider = ({ children, value }: Props) => {
  if (!RULES_SECRET_KEY) return <>{children}</>

  return (
    <AidomxContext.Provider value={value}>{children}</AidomxContext.Provider>
  )
}

export const useAidomx = (): RulesConfig => {
  const ctx = useContext(AidomxContext)

  if (!ctx) {
    console.warn('[Aidomx] No context provider!')
  }

  return defineRules(ctx)
}
