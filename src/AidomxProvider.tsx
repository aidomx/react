'use client'

import { ReactNode } from 'react'
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
