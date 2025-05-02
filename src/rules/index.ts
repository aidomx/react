<<<<<<< HEAD
export * from './define'
export * from './manage'
export * from './store'
export * from './virtual'
=======
import { defineRules } from '@aidomx/core'

export const rules = defineRules({
  root: 'container',
  components: [],
  skeleton: {
    name: 'container',
    status: true,
    delay: 200,
    content: 'Preparing ghost components...',
  },
})
>>>>>>> 97c6176 (big refactor for prepare production)
