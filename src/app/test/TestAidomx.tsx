'use client'

import { Aidomx } from '@/providers'
import dashboard from '@/rules/components/dashboard'

export default function TestAidomx() {
  return <Aidomx name="container" scope={{ dashboard }} />
}
