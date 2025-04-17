'use client'

import { HTMLAttributes } from 'react'
import { ApplyComponentRules } from '../utils/ApplyComponentRules'
import { useAidomx } from '../AidomxProvider'

type Props = HTMLAttributes<HTMLParagraphElement> & {
  vAi?: string
}

export const Text = ({ vAi, children, ...props }: Props) => {
  const rules = useAidomx()
  const name = vAi ? vAi : ''
  const component = rules?.components?.find((c) => c.name === name)

  if (!component) return null

  const applied = ApplyComponentRules(component, name)

  return (
    <p {...applied} {...props}>
      {children}
    </p>
  )
}
