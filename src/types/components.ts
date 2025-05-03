import type {
  Design,
  Listeners,
  RuleComponent,
  Rules,
  Skeleton,
} from '@aidomx/core'
import { ReactNode } from 'react'

export type AidomxProps = {
  name: string
  scope: Record<string, RuleComponent | RuleComponent[]>
}

export type GhostWrapperProps = {
  rules: Rules
} & AidomxProps

export type SkeletonProps = {
  skeleton: Skeleton
} & Pick<AidomxProps, 'name'>

// Komponen desain dasar
export type DesignProps = {
  design: Design
  children: ReactNode
  listeners: Listeners
}
