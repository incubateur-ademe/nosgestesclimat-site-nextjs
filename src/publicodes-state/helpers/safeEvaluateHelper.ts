import { Engine, NGCEvaluatedNode, RuleName } from '../types'

export const safeEvaluateHelper = (
  rule: RuleName,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  try {
    return engineUsed.evaluate(rule)
  } catch (error) {
    // TODO: Sending error to Sentry breaks the app
    console.warn(error)
  }
  return null
}
