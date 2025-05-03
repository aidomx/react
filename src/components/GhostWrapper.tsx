'use client'

import { createVirtual, type RuleComponent } from '@aidomx/core'
import { useEffect, useRef, useState, JSX, ReactNode } from 'react'
import { SkeletonUI } from './Skeleton'
import { NotFound } from './NotFound'
import { DesignProps, GhostWrapperProps } from '@/types'

export const GhostWrapper = ({ name, rules, scope }: GhostWrapperProps) => {
  const [mounted, setMounted] = useState(false)
  const vrRef = useRef(createVirtual(rules))
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    const entries: RuleComponent[] = []

    if (scope) {
      for (const value of Object.values(scope)) {
        if (Array.isArray(value)) {
          entries.push(...value)
        } else {
          entries.push(value)
        }
      }
    }

    if (entries.length > 0) {
      vrRef.current.createGhost({ entries, autoCompile: true })
    }

    initialized.current = true
    if (rules.skeleton?.status && rules.skeleton.name === name) {
      setTimeout(() => setMounted(true), rules.skeleton.delay)
    }

    setMounted(true)
  }, [scope])

  if (!mounted) return <SkeletonUI name={name} skeleton={rules.skeleton} />

  const allGhosts = vrRef.current.pullGhost()

  if (!Object.keys(allGhosts).length) return <NotFound name={name} />

  const contents = Object.values(allGhosts)

  return (
    <div id={name}>
      {contents.map((item, key) => renderComponent(item, key))}
    </div>
  )
}

// Render rekursif untuk RuleComponent
const renderComponent = (item: RuleComponent, key?: React.Key): ReactNode => {
  const hasData = item?.data && item.data.length > 0

  const children = item.scope?.map((child, idx) =>
    renderComponent(child, `${key}-child-${idx}`)
  )

  if (hasData) {
    return item.data!.map((dataItem, i) => (
      <CreateDesign
        key={`${key}-data-${i}`}
        design={item.design || { type: 'div' }}
        listeners={item?.listeners}
      >
        {JSON.stringify(dataItem)}
        {children}
      </CreateDesign>
    ))
  }

  if (item?.design) {
    return (
      <CreateDesign key={key} design={item.design} listeners={item.listeners}>
        {item.design.content}
        {children}
      </CreateDesign>
    )
  }

  return null
}

const CreateDesign = ({ design, children, listeners }: DesignProps) => {
  const { className, content, type } = design
  const Tag = type as keyof JSX.IntrinsicElements

  const safeListeners: Record<string, any> = {}

  if (listeners) {
    for (const [key, fn] of Object.entries(listeners)) {
      if (typeof fn === 'function') {
        safeListeners[key] = fn
      } else {
        console.warn(`Listener '${key}' is not a function`, fn)
      }
    }
  }

  return (
    <Tag {...safeListeners} className={className}>
      {content ?? children}
    </Tag>
  )
}
