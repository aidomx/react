//import type { Rules, Component, DataObject, returnTypeState } from './types'

//type ComponentMap = Map<string, Component>

//export function defineRules(base: Rules): Rules & returnTypeState {
//let internalState = base.data || {}
//const originalComponents = new Map<string, Component>()
//const dynamicComponents = new Map<string, Component>()

//base.components?.forEach((c) => {
//if (!c.name) return
//originalComponents.set(c.name, structuredClone(c))
//dynamicComponents.set(c.name, structuredClone(c))
//})

//const get = () => internalState
//const set = (partial: Partial<DataObject>) => {
//internalState = { ...internalState, ...partial }
//}

//const resetComponent = (name: string) => {
//const original = originalComponents.get(name)
//if (!original) return
//dynamicComponents.set(name, structuredClone(original))
//}

//const has = (name: string) => dynamicComponents.has(name)

//const remove = (name: string) => {
//dynamicComponents.delete(name)
//}

//const proxy = new Proxy(
//{
//...base,
//get,
//set,
//resetComponent,
//has,
//remove,
//components: base.components,
//},
//{
//get(target, key: string) {
//// Prioritaskan method dan field utama
//if (key in target) return target[key as keyof typeof target]

//// Resolve komponen by name
//const comp = dynamicComponents.get(key)
//if (!comp) return undefined

//return new Proxy(comp, {
//get(obj, prop: string) {
//if (prop === 'reset') return () => resetComponent(key)
//return obj[prop as keyof Component]
//},
//set(obj, prop: string, value: any) {
//obj[prop as keyof Component] = value
//dynamicComponents.set(key, obj)
//return true
//},
//})
//},
//}
//)

//const exec = (fn?: any) => {
//if (typeof fn === 'function') {
//const result = fn(internalState)
//if (typeof result === 'function') result(internalState)
//}
//}

//exec(base.onList)
//exec(base.onState)

//return proxy
//}

// src/rules/defineRules.ts
import type { Rules } from '../types'
import {
  getInternal,
  hasInternal,
  initInternal,
  removeInternal,
  setAfterInternal,
  setBeforeInternal,
  setInternal,
} from '../utils'

export const defineRules = (rules: Rules) => {
  initInternal(rules)

  return {
    ...getInternal(),
    get: getInternal,
    set: setInternal,
    has: hasInternal,
    remove: removeInternal,
    setAfter: setAfterInternal,
    setBefore: setBeforeInternal,
  }
}
