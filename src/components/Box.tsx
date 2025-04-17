'use client'

import { HTMLAttributes } from 'react'
import { ApplyComponentRules } from '../utils/ApplyComponentRules'
import { useAidomx } from '../AidomxProvider'
import type { Component } from '../types'

type Props = HTMLAttributes<HTMLDivElement> & {
  vAi?: string
}

export const Box = ({ vAi, children, ...props }: Props) => {
  const rules = useAidomx()
  const name = vAi ? vAi : ''
  const component = rules?.components?.find((c: Component) => c.name === name)

  if (!component) return null

  const applied = ApplyComponentRules(component, name)

  return (
    <div {...applied} {...props}>
      {children}
    </div>
  )
}
