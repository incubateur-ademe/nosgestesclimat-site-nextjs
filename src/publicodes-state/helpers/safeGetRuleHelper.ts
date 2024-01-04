import { captureException } from '@sentry/react'
import { Engine, NGCRuleNode } from '../types'

export const safeGetRuleHelper = (
  dottedName: string,
  engineUsed: Engine
): NGCRuleNode | null => {
  let rule = null
  try {
    rule = engineUsed.getRule(dottedName)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return rule
}
