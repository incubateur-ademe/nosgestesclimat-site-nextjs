import { captureException } from '@sentry/react'
import { DottedName, Engine, NGCEvaluatedNode } from '../types'

export const safeEvaluateHelper = (
  ruleName: DottedName,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    evaluation = engineUsed.evaluate(ruleName)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return evaluation
}
