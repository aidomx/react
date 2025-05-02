'use client'

import { createContext } from 'react'
import type { Rules } from '@aidomx/core'

export const AidomxContext = createContext<Rules>({} as Rules)
