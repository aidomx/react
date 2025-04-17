'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { useAidomx } from './AidomxProvider'
import { ApplyRules } from './utils/ApplyRules'

type Props = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  name: string
}

export const Aidomx = ({ children, name, ...props }: Props) => {
  const rules = useAidomx()

  if (!rules?.root || rules.root !== name) return <>{children}</>

  const applied = ApplyRules(rules, name)

  return (
    <div {...applied} {...props}>
      {children}
    </div>
  )
}
