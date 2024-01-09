import { captureException } from '@sentry/react'
import { DottedName, Engine, NGCEvaluatedNode } from '../types'

export const safeEvaluateHelper = (
  dottedName: DottedName,
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
