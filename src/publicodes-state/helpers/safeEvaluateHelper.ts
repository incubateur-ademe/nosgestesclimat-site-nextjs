import { captureException } from '@sentry/react'
import { Engine, NGCEvaluatedNode } from '../types'

export const safeEvaluateHelper = (
  rule: string,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    evaluation = engineUsed.evaluate(rule)
  } catch (error) {
    captureException(error)
    console.warn(error)
  }
  return evaluation
}
