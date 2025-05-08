'use client'

import { ReactNode, useContext } from 'react'
import { AidomxContext } from './AidomxContext'
import { RULES_SECRET_KEY, type Rules } from '@aidomx/core'

type Props = {
  children: ReactNode
  value: Rules
}

export const AidomxProvider = ({ children, value }: Props) => {
  if (!RULES_SECRET_KEY)
    return (
      <div>
        <h1>Rules secret key</h1>
        <p>Please set your RULES_SECRET_KEY in .env or .env.local file.</p>
        <p>Example: </p>
        <pre>
          {`
          // .env or .env.local
          RULES_SECRET_KEY="secret"
          `}
        </pre>
      </div>
    )

  return (
    <AidomxContext.Provider value={value}>{children}</AidomxContext.Provider>
  )
}

export const useAidomx = (): Rules => {
  const ctx = useContext(AidomxContext)

  if (!ctx) {
    console.warn('[Aidomx] No context provider!')
  }

  return ctx
}
