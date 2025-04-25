// src/rules/helpers/reorder.ts
import { dynamicComponents } from './init'

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
