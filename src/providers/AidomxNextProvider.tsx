'use client'

import { ReactNode } from 'react'
import { useAidomx } from './AidomxProvider'

type Props = { children: ReactNode }

export const AidomxNextProvider = ({ children }: Props) => {
  const rules = useAidomx()

  if (!rules?.root || !rules?.components) return <>{children}</>

  return <>{children}</>
}
