import { useMemo } from 'react'

import Engine from 'publicodes'

export default function useEngine(rules: any) {
  const engine = useMemo(() => new Engine(rules), [rules])

  const safeEvaluate = useMemo(
    () => (rule: string) => {
      let evaluation = {}
      try {
        evaluation = engine.evaluate(rule)
      } catch (error) {
        console.error(error)
      }
      return evaluation
    },
    [engine]
  )
  const safeGetRule = useMemo(
    () => (rule: string) => {
      let evaluation = {}
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
