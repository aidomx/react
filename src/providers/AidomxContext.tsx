'use client'

import { createContext } from 'react'
import type { Rules } from '../types'

export const AidomxContext = createContext<Rules>({} as Rules)
