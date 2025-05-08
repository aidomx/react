'use client'

import { ReactNode } from 'react'
import { MissConfig } from '@/components/MissConfig'
import type { AidomxProps } from '@/types'
import { Wrapper } from '@/components'
import { useAidomx } from './AidomxProvider'

export const Aidomx = ({ name, scope = [] }: AidomxProps): ReactNode => {
  const rules = useAidomx()

  if (!rules?.root || !rules?.components || rules.root !== name)
    return <MissConfig />

  return <Wrapper name={name} scope={scope} />
}
