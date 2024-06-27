import Engine, { PublicodesExpression } from 'publicodes'
import { NGCEvaluatedNode } from '../types'

export const safeEvaluateHelper = (
  expr: PublicodesExpression,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    evaluation = engineUsed.evaluate(expr)
  } catch (error) {
    console.warn(error)
    // captureException(error)
  }
  return evaluation
}
