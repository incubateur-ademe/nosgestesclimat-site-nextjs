import { safeGetRuleHelper } from '@/publicodes-state/helpers/safeGetRuleHelper'
import Engine, { PublicodesExpression } from 'publicodes'
import { useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
import { DottedName, NGCEvaluatedNode, NGCRuleNode, Rules } from '../../types'

/**
 * Initiate the engine based on the rules we pass
 *
 * Also return safeEvaluate and safeGetRule wich catch errors if dottedName is invalid
 *
 * And a pristine engine wich can be used to assess rules without any situation (for exemple, we can reliably sort the subcategories this way)
 */
export function useEngine(rules: Rules) {
  if (!rules) throw new Error('Missing rules')

  const engine = useMemo<Engine>(() => {
    const nbRules = Object.keys(rules).length
    console.time(`⚙️ Parsing ${nbRules}`)
    const engine = new Engine(rules, {
      logger: {
        log: console.log,
        warn: () => null,
        error: console.error,
      },
      allowOrphanRules: true,
    })
    console.timeEnd(`⚙️ Parsing ${nbRules}`)
    return engine
  }, [rules])

  const pristineEngine = useMemo(() => engine.shallowCopy(), [engine])

  const safeEvaluate = useMemo<
    (expr: PublicodesExpression) => NGCEvaluatedNode | null
  >(() => (expr) => safeEvaluateHelper(expr, engine), [engine])

  const safeGetRule = useMemo<(ruleName: DottedName) => NGCRuleNode | null>(
    () => (ruleName: DottedName) => safeGetRuleHelper(ruleName, engine),
    [engine]
  )

  return { engine, pristineEngine, safeEvaluate, safeGetRule }
}
