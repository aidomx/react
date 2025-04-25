import { dynamicComponents, originalComponents } from './init'

export const removeInternal = (name: string) => {
  dynamicComponents.delete(name)
}

export const hasInternal = (name: string) => {
  return dynamicComponents.has(name)
}

export const resetComponent = (name: string) => {
  const original = originalComponents.get(name)
  if (!original) return
  dynamicComponents.set(name, structuredClone(original))
}
