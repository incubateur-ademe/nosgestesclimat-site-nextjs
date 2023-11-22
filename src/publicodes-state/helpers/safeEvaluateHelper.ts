import { Engine, NGCEvaluatedNode } from '../types'

export const safeEvaluateHelper = (
  rule: string,
  engineUsed: Engine
): NGCEvaluatedNode | null => {
  let evaluation = null
  try {
    if (rule === 'bilan') {
      console.time('eval bilan')
    }
    evaluation = engineUsed.evaluate(rule)
    if (rule === 'bilan') {
      console.timeEnd('eval bilan')
    }
  } catch (error) {
    // TODO: Sending error to Sentry breaks the app
    console.warn(error)
  }
  return evaluation
}
