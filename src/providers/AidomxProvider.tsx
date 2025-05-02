'use client'

import { ReactNode, useContext } from 'react'
import { AidomxContext } from './AidomxContext'
<<<<<<< HEAD
import { AidomxNextProvider } from './AidomxNextProvider'
import type { Rules } from '../types'
import { RULES_SECRET_KEY } from '../constants/rulesKey'
=======
import { defineRules, RULES_SECRET_KEY, type Rules } from '@aidomx/core'
>>>>>>> 97c6176 (big refactor for prepare production)

type Props = {
  children: ReactNode
  value: Rules
}

export const AidomxProvider = ({ children, value }: Props) => {
  if (!RULES_SECRET_KEY) return <>{children}</>

  return (
<<<<<<< HEAD
    <AidomxContext.Provider value={value}>
      <AidomxNextProvider>{children}</AidomxNextProvider>
    </AidomxContext.Provider>
  )
}

export const useAidomx = () => {
  const ctx: Rules = useContext(AidomxContext)
=======
    <AidomxContext.Provider value={value}>{children}</AidomxContext.Provider>
  )
}

export const useAidomx = (): Rules => {
  const ctx = useContext(AidomxContext)
>>>>>>> 97c6176 (big refactor for prepare production)

  if (!ctx) {
    console.warn('[Aidomx] No context provider!')
  }

<<<<<<< HEAD
  return ctx
=======
  return defineRules(ctx)
>>>>>>> 97c6176 (big refactor for prepare production)
}
