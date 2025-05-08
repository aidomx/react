import type { Design, RuleEvent, Rules, Skeleton } from '@aidomx/core'
import { ReactNode } from 'react'

export type AidomxProps = {
  name: string
  scope?: string[]
}

export type GhostWrapperProps = {
  partial: Rules
} & AidomxProps

export interface WrapperProps extends AidomxProps {}

export type SkeletonProps = {
  skeleton: Skeleton
} & Pick<AidomxProps, 'name'>

// Komponen desain dasar
export type DesignProps = {
  id?: string
  design: Design
  children: ReactNode
  listeners?: {
    [event: string]: (event: RuleEvent) => void
  }
}
