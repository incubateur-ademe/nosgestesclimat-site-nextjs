import { Engine, NGCEvaluatedNode } from '../types'

// Todo: send errors to Sentry
export const safeEvaluateHelper = (
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
