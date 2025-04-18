//!src/utils/rulesHelpers.ts
import type { Rules, Component, DataObject } from '../types'
import eventMaps from './eventMaps'

let internalRules: Rules
let internalState: DataObject = {}
const originalComponents = new Map<string, Component>()
const dynamicComponents = new Map<string, Component>()

const excludeEventHandlers = (component: Component) => {
  const events: Record<string, any> = {}
  const rest: Record<string, any> = {}

  for (const key in component) {
    if (eventMaps.includes(key)) {
      events[key] = component[key]
    } else {
      rest[key] = component[key]
    }
  }

  return { events, rest }
}

export const initInternal = (rules: Rules) => {
  internalRules = rules
  internalState = rules.data || {}
  rules.components?.forEach((c) => {
    if (!c.name) return

    // Exclude event handler
    const { events, rest } = excludeEventHandlers(c)

    const clone = structuredClone(rest)
    originalComponents.set(c.name, clone)
    dynamicComponents.set(c.name, clone)

    const dynamic = dynamicComponents.get(c.name)
    if (!dynamic) return

    for (const eventName of eventMaps) {
      if (events[eventName]) {
        dynamic[eventName] = events[eventName]
      }
    }
  })
  // Jalankan handler jika tersedia
  execute(rules.onList)
  execute(rules.onState)
}

export const getInternal = () => ({
  ...internalRules,
  components: [...dynamicComponents.values()],
})

export const setInternal = (partial: Partial<DataObject>) => {
  internalState = { ...internalState, ...partial }
}

export const hasInternal = (name: string) => dynamicComponents.has(name)

export const removeInternal = (name: string) => {
  dynamicComponents.delete(name)
}

export const setAfterInternal = (targetName: string, id: string) => {
  reorderComponents(targetName, id, 'after')
}

export const setBeforeInternal = (targetName: string, id: string) => {
  reorderComponents(targetName, id, 'before')
}

const reorderComponents = (
  targetName: string,
  id: string,
  pos: 'before' | 'after'
) => {
  const comps = [...dynamicComponents.values()]
  const targetIndex = comps.findIndex((c) => c.name === targetName)
  const idIndex = comps.findIndex((c) => c.name === id)
  if (targetIndex === -1 || idIndex === -1) return

  const [moved] = comps.splice(idIndex, 1)
  const insertAt = pos === 'after' ? targetIndex + 1 : targetIndex
  comps.splice(insertAt, 0, moved)

  dynamicComponents.clear()
  comps.forEach((c) => c.name && dynamicComponents.set(c.name, c))
}

const execute = (fn?: any) => {
  if (typeof fn === 'function') {
    const result = fn(internalState)
    if (typeof result === 'function') result(internalState)
  }
}

export const resetComponent = (name: string) => {
  const original = originalComponents.get(name)
  if (!original) return
  dynamicComponents.set(name, structuredClone(original))
}
