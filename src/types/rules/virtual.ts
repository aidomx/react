// ===============================
// Core Interface & Types
// ===============================

import type { Component } from './structure'

export interface GhostElement extends Component {
  children?: Component[]
}

export type CreateGhostProps = {
  entries: GhostElement[]
  autoCompile: boolean
}

export type GhostElements = GhostElement | GhostElement[]

export type LoopConfig = {
  count: number
  template: {}
}

// API Types
// ===============================

export type CreateGhostLayer = (options: CreateGhostProps) => GhostElements

export type LoopLayer = (id: string, config: LoopConfig) => {}[]

export type CompileLayer = (ghost: GhostElement) => void

export type RenderLayer = () => void

export type FreezeLayer = (id?: string) => void

export type RemoveLayer = (id: string) => boolean

export type DuplicateLayer = (id: string) => GhostElement | null

export type GetLayer = (id: string) => GhostElement | undefined

export type SortLayer = (id: string, cb: (a: number, b: number) => void) => void

export type MaintenceLayer = boolean
// ===============================
// Virtual API
// ===============================

export type VirtualApi = {
  createGhost: CreateGhostLayer
  loop: LoopLayer
  compile: CompileLayer
  render: RenderLayer
  freeze: FreezeLayer
  maintence: MaintenceLayer
  remove: RemoveLayer
  duplicate: DuplicateLayer
  get: GetLayer
  sort: SortLayer
}
