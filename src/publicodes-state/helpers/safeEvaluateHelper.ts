import type { Engine } from '@/publicodes-state/types'
import { captureException } from '@sentry/react'
import type { EvaluatedNode, PublicodesExpression } from 'publicodes'

export const safeEvaluateHelper = (
  expr: PublicodesExpression,
  engineUsed: Engine
): EvaluatedNode | null => {
  let evaluation: EvaluatedNode | null = null
  try {
    evaluation = engineUsed.evaluate(expr)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return evaluation
}
