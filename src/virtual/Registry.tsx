'use client'

import { ReactNode } from 'react'
import { useAidomx } from '../providers'
import { CreateElementWrapper } from '../core'
import { getSkeletonProps, SkeletonUI } from '../utils'

/**
 * Props untuk komponen `Layout`, digunakan untuk elemen root utama.
 */
type LayoutProps = {
  /** Anak-anak elemen yang dibungkus dalam layout */
  children?: ReactNode
  /** Nama layout yang sesuai dengan rules.root */
  name: string
}

/**
 * Komponen `Layout` bertindak sebagai root layout berdasarkan `rules.root`.
 * Ia akan menerapkan `tagName` dan skeleton jika tersedia di dalam rules.
 *
 * @param {LayoutProps} props - Properti dari komponen Layout
 * @returns `{JSX.Element}` Elemen HTML yang telah diproses sesuai rules
 */
export const Layout = ({ name, children }: LayoutProps) => {
  const rules = useAidomx()

  if (SkeletonUI(rules, name)) {
    const { className, style } = getSkeletonProps(rules, name)
    return <div className={className} style={style} />
  }

  const tagName =
    rules?.root === name && rules[name]?.tagName ? rules[name].tagName : 'div'

  return (
    <CreateElementWrapper
      name={name}
      tagName={tagName}
      featureType={rules.type}
    >
      {children}
    </CreateElementWrapper>
  )
}

/**
 * Props untuk komponen `UI`, digunakan untuk komponen turunan dari registry.
 */
type UIProps = {
  /** Anak-anak elemen yang dibungkus dalam UI */
  children?: ReactNode
  /** vAi adalah identifier unik dari komponen (biasanya dari rules.components.name) */
  vAi: string
}

/**
 * Komponen `UI` digunakan untuk me-render komponen berbasis registry `rules.components`.
 * Ia akan mencari tagName dan skeleton berdasarkan `vAi` yang diberikan.
 *
 * @param {UIProps} props - Properti dari komponen UI
 * @returns `{JSX.Element}` Elemen HTML yang telah diproses sesuai komponen rules */
export const UI = ({ vAi, children }: UIProps) => {
  const rules = useAidomx()

  if (SkeletonUI(rules, vAi)) {
    const { className, style } = getSkeletonProps(rules, vAi)
    return <div className={className} style={style} />
  }

  const component = rules?.components?.find((c) => c.name === vAi)
  const tagName = component?.tagName || 'div'

  return (
    <CreateElementWrapper name={vAi} tagName={tagName} featureType={rules.type}>
      {children}
    </CreateElementWrapper>
  )
}
