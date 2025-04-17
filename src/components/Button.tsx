'use client'

import { ButtonHTMLAttributes } from 'react'
import { ApplyComponentRules } from '../utils/ApplyComponentRules'
import { useAidomx } from '../AidomxProvider'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  vAi?: string
}

export const Button = ({ vAi, children, ...props }: Props) => {
  const rules = useAidomx()
  const name = vAi ? vAi : ''
  const component = rules?.components?.find((c) => c.name === name)

  if (!component) return null

  const applied = ApplyComponentRules(component, name)

  return (
    <button {...applied} {...props}>
      {children}
    </button>
  )
}
