'use client'

import type { RuleComponent } from '@aidomx/core'
import { GhostWrapper } from '@/components/GhostWrapper'
import { useAidomx } from './AidomxProvider'
import { ReactNode } from 'react'
import { MissConfig } from '@/components/MissConfig'
import type { AidomxProps } from '@/types'

export const Aidomx = ({ name, scope }: AidomxProps): ReactNode => {
  const resolved = useAidomx()

  if (!resolved?.root || !resolved?.components || resolved.root !== name)
    return <MissConfig />

  return <GhostWrapper name={name} rules={resolved} scope={scope} />
}
