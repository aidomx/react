// src/rules/helpers/getters.ts
import { dynamicComponents } from './init'
import { internalRules } from './init'

export const getInternal = () => ({
  ...internalRules,
  components: [...dynamicComponents.values()],
})
