import Engine from 'publicodes'
import { NGCEvaluatedNode } from '../types'

// Todo: send errors to Sentry
export const safeEvaluate = (
  rule: string,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    evaluation = engineUsed.evaluate(rule)
  } catch (error) {
    console.warn(error)
  }
  return evaluation
}
