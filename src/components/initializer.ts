import { cloneMap, eventMaps, originMap } from '@/src/_maps'
import type { Component, Rules } from '@/src/types'

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

export const Initializer = (rules: Rules) => {
  rules.components?.forEach((c) => {
    if (!c.name) return
    const { events, rest } = excludeEventHandlers(c)
    const clone = structuredClone(rest)
    originMap.set(c.name, clone)
    cloneMap.set(c.name, clone)

    const cloned = cloneMap.get(c.name)
    if (!cloned) return

    for (const eventName of eventMaps) {
      if (events[eventName]) {
        cloned[eventName] = events[eventName]
      }
    }
  })
}
