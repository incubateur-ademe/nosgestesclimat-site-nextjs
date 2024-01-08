import { captureException } from '@sentry/react'
import { Engine, NGCEvaluatedNode } from '../types'

export const safeEvaluateHelper = (
  dottedName: string,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    evaluation = engineUsed.evaluate(dottedName)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return evaluation
}
