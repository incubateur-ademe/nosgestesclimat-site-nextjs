import { captureException } from '@sentry/react'
import { DottedName, Engine, NGCRuleNode } from '../types'

export const safeGetRuleHelper = (
  ruleName: DottedName,
  engineUsed: Engine
): NGCRuleNode | null => {
  let rule = null
  try {
    rule = engineUsed.getRule(ruleName)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return rule
}
