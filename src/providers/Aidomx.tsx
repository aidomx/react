'use client'

import type { RuleComponent } from '@aidomx/core'
import { GhostWrapper } from '@/components/GhostWrapper'
import { useAidomx } from './AidomxProvider'
import { ReactNode } from 'react'

type Props = {
  name: string
  scope: Record<string, RuleComponent | RuleComponent[]>
}

export const Aidomx = ({ name, scope }: Props): ReactNode => {
  const resolved = useAidomx()

  if (!resolved?.root || !resolved?.components || resolved.root !== name)
    return (
      <div className="flex flex-col items-center justify-center text-center text-red-500 p-6">
        <h2 className="text-lg font-semibold mb-2">Aidomx Error</h2>
        <p className="text-sm">
          Missing configuration. Please ensure that <code>rules.root</code> and{' '}
          <code>rules.components</code> are properly defined.
        </p>
      </div>
    )

  return <GhostWrapper name={name} rules={resolved} scope={scope} />
}
