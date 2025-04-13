'use client'

import { createContext } from 'react'
import type { Rules } from 'aidomx'

type RulesContext = Rules | Record<string, string>

export const AidomxContext = createContext<RulesContext>({})
