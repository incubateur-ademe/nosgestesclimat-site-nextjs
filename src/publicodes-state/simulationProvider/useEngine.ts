import Engine from 'publicodes'
import { useMemo } from 'react'
import { NGCEvaluatedNode, NGCRuleNode, Rules } from '../types'

export default function useEngine(rules: Rules) {
  const engine = useMemo(() => new Engine(rules), [rules])

  // Todo: send errors to Sentry
  const safeEvaluate = useMemo<(rule: string) => NGCEvaluatedNode | null>(
    () => (rule: string) => {
      let evaluation = null
      try {
        evaluation = engine.evaluate(rule)
      } catch (error) {
        console.warn(error)
      }
      return evaluation
    },
    [engine]
  )
  const safeGetRule = useMemo<(rule: string) => NGCRuleNode | null>(
    () => (rule: string) => {
      let evaluation = null
      try {
        evaluation = engine.getRule(rule)
      } catch (error) {
        console.error(error)
      }
      return evaluation
    },
    [engine]
  )

  return { engine, safeEvaluate, safeGetRule }
}
