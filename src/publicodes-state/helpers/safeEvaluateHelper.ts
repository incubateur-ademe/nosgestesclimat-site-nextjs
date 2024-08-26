import { Engine, NGCEvaluatedNode } from '@/publicodes-state/types'
import { captureException } from '@sentry/react'
import { PublicodesExpression } from 'publicodes'

export const safeEvaluateHelper = (
  expr: PublicodesExpression,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation: NGCEvaluatedNode | null = null
  try {
    evaluation = engineUsed.evaluate(expr)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return evaluation
}
