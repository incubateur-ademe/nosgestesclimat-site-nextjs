import { Engine, NGCEvaluatedNode } from '../types'

export const safeEvaluateHelper = (
  rule: string,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    evaluation = engineUsed.evaluate(rule)
  } catch (error) {
    // TODO: Sending error to Sentry breaks the app
    console.warn(error)
  }
  return evaluation
}
