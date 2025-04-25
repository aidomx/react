// src/rules/helpers/setters.ts
import { DataObject } from '@/src/types'
import { internalState } from './init'

export const setInternal = (partial: Partial<DataObject>) => {
  Object.assign(internalState, partial)
}
