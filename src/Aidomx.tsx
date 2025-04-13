'use client'

import { ReactNode, useContext, useEffect } from 'react'
import { AidomxContext } from './AidomxContext'
import { AidomxElement } from './AidomxElement'

type Props = {
  children: ReactNode
}

export const Aidomx = ({ children }: Props) => {
  const context = useContext(AidomxContext)

  useEffect(() => {
    const runContext = async () => {
      if (context) {
        await AidomxElement(context)
      }
    }

    runContext()
  }, [context, AidomxElement])

  return <>{children}</>
}
