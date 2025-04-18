import { ApplyComponentRules } from '@/src/utils'
import { useAidomx } from '../providers'
import type { Component } from '@/src/types'

type ComponentCompilerProps = {
  name: string
  [key: string]: any
}

export const ComponentCompiler = ({
  name = '',
  ...props
}: ComponentCompilerProps) => {
  const rules = useAidomx()

  const component: Component | undefined = rules?.components?.find(
    (c) => c.name === name
  )

  if (!component) return { ...props }

  const appliedRules = ApplyComponentRules(component, name)

  return {
    ...appliedRules,
    ...props,
  }
}
