import Engine from 'publicodes'
import { useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
import { NGCEvaluatedNode, NGCRuleNode, Rules } from '../../types'

/**
 * Initiate the engine based on the rules we pass
 *
 * Also return safeEvaluate and safeGetRule wich catch errors if dottedName is invalid
 *
 * And a pristine engine wich can be used to assess rules without any situation (for exemple, we can reliably sort the subcategories this way)
 */
export default function useEngine(rules: Rules) {
  const engine = useMemo<Engine>(
    () =>
      new Engine(rules, {
        logger: {
          log: console.log,
          warn: () => null,
          error: console.error,
        },
      }),
    [rules]
  )

  const pristineEngine = useMemo(() => engine.shallowCopy(), [engine])

  const safeEvaluate = useMemo<(rule: string) => NGCEvaluatedNode | null>(
    () => (rule: string) => safeEvaluateHelper(rule, engine),
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

  return { engine, pristineEngine, safeEvaluate, safeGetRule }
}
