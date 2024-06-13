import { captureException } from '@sentry/react'
import Engine, { PublicodesExpression } from 'publicodes'
import { NGCEvaluatedNode } from '../types'

export const safeEvaluateWithMetric = (
  expr: PublicodesExpression,
  engineUsed: Engine,
  metric: 'carbone' | 'eau' = 'carbone'
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    evaluation = engineUsed.evaluateWithMetric(expr, metric)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return evaluation
}
