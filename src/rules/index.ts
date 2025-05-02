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
