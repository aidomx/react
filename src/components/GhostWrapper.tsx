'use client'

import {
  createVirtual,
  type RulesConfig,
  type RuleComponent,
  Listeners,
  Design,
} from '@aidomx/core'
import { useEffect, useRef, useState, JSX, ReactNode } from 'react'
import { SkeletonUI } from './Skeleton'

type GhostProps = {
  name: string // hanya untuk id/wrapper
  rules: RulesConfig
  scope?: Record<string, RuleComponent | RuleComponent[]>
}

export const GhostWrapper = ({ name, rules, scope }: GhostProps) => {
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

  if (!Object.keys(allGhosts).length) {
    return (
      <div id={name} className="text-center text-gray-400 py-10">
        <h2 className="text-lg font-semibold">No components found</h2>
        <p>Please check your entries or scope configuration.</p>
      </div>
    )
  }

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
        listeners={item?.listeners as Listeners}
      >
        {JSON.stringify(dataItem)}
        {children}
      </CreateDesign>
    ))
  }

  if (item?.design) {
    return (
      <CreateDesign
        key={key}
        design={item.design}
        listeners={item.listeners as Listeners}
      >
        {item.design.content}
        {children}
      </CreateDesign>
    )
  }

  return null
}

// Komponen desain dasar
type DesignProps = {
  design: Design
  children: ReactNode
  listeners: Listeners
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
