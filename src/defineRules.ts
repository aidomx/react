import { Parse } from 'aidomx'
import type { Rules } from 'aidomx'

export const defineRules = (rules: Rules) => Parse(rules)
