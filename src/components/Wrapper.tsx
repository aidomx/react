'use client'

import { useEffect, useMemo, useState, JSX, ReactNode } from 'react'
import {
  settings,
  getListenerMap,
  type RuleEvent,
  type RuleComponent,
} from '@aidomx/core'
import { NotFound } from './NotFound'
import { SkeletonUI } from './Skeleton'
import type { WrapperProps, DesignProps } from '@/types'
import { useAidomx } from '@/providers'

export const Wrapper = ({ name, scope }: WrapperProps) => {
  const [mounted, setMounted] = useState(false)
  const rules = useAidomx()

  useEffect(() => {
    // Optional: delay for skeleton
    const skeleton = settings.getSkeleton?.(name)

    if (skeleton?.status) {
      const timer = setTimeout(() => setMounted(true), skeleton.delay)
      return () => clearTimeout(timer)
    }
    setMounted(true)
  }, [name, scope])

  const ghostMap = useMemo(() => {
    if (!settings.getDefined() && !settings.getCompiled) return null
    if (!Array.isArray(scope)) return null
    return settings.pull(scope)
  }, [scope])

  if (!mounted) {
    const skeleton = settings.getSkeleton?.(name)
    return <SkeletonUI name={skeleton?.name ?? name} skeleton={skeleton} />
  }

  if (!settings.getDefined()) {
    return <NotFound name={name} />
  }

  return (
    <div id={name} className={rules?.design?.className}>
      {Object.values(ghostMap).map((item, key) => renderComponent(item, key))}
    </div>
  )
}

const renderComponent = (item: RuleComponent, key?: React.Key): ReactNode => {
  const hasData = item?.data && item.data.length > 0
  const children = item.scope?.map((child, idx) =>
    renderComponent(child, `${key}-child-${idx}`)
  )

  const listeners = getListenerMap(item.name) || item.listeners || {}

  if (hasData) {
    return item.data.map((dataItem, i) => (
      <CreateDesign
        id={item.name}
        key={`${key}-data-${i}`}
        design={item.design || { type: 'div' }}
        listeners={listeners}
      >
        {JSON.stringify(dataItem)}
        {children}
      </CreateDesign>
    ))
  }

  if (item?.design) {
    return (
      <CreateDesign
        id={item.name}
        key={key}
        design={item.design}
        listeners={listeners}
      >
        {item.design.content}
        {children}
      </CreateDesign>
    )
  }

  return null
}

const CreateDesign = ({ id, design, children, listeners }: DesignProps) => {
  const { className, content, type } = design
  const Tag = type as keyof JSX.IntrinsicElements

  const safeListeners: Record<string, any> = {}
  for (const [key, fn] of Object.entries(listeners || {})) {
    if (typeof fn === 'function') {
      safeListeners[key] = (e: RuleEvent) => fn(e)
    }
  }

  return (
    <Tag id={id} className={className} {...safeListeners}>
      {content ?? children}
    </Tag>
  )
}
