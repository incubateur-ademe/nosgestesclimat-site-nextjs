import { captureException } from '@sentry/react'
import { PublicodesExpression } from 'publicodes'
import { Engine, NGCEvaluatedNode } from '../types'

export const safeEvaluateHelper = (
  expr: PublicodesExpression,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    evaluation = engineUsed.evaluate(expr)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return evaluation
}
