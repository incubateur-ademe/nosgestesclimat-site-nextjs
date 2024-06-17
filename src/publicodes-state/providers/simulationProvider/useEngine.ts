import { generateEngine } from '@/helpers/publicodes/generateEngine'
import { safeGetRuleHelper } from '@/publicodes-state/helpers/safeGetRuleHelper'
import { safeGetSituation } from '@/publicodes-state/helpers/safeGetSituation'
import { PublicodesExpression } from 'publicodes'
import { useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
import {
  DottedName,
  NGCEngine,
  NGCEvaluatedNode,
  NGCRuleNode,
  Rules,
} from '../../types'

/**
 * Initiate the engine based on the rules we pass
 *
 * Also return safeEvaluate and safeGetRule wich catch errors if dottedName is invalid
 *
 * And a pristine engine wich can be used to assess rules without any situation (for exemple, we can reliably sort the subcategories this way)
 */
export function useEngine(rules: Rules) {
  if (!rules) throw new Error('Missing rules')

  const engine = useMemo<NGCEngine>(() => {
    const nbRules = Object.keys(rules).length

    console.time(`⚙️ Parsing ${nbRules}`)

    const engine = generateEngine(rules)

    console.timeEnd(`⚙️ Parsing ${nbRules}`)

    return engine
  }, [rules])

  const waterEngine = useMemo<NGCEngine>(() => {
    const nbRules = Object.keys(rules).length

    console.time(`⚙️ Parsing ${nbRules}`)

    const engine = generateEngine(rules)

    engine.setSituation(
      safeGetSituation({
        situation: { métrique: "'eau'" },
        everyRules: Object.keys(rules),
      })
    )

    console.timeEnd(`⚙️ Parsing ${nbRules}`)

    return engine
  }, [rules])

  const safeEvaluateWater = useMemo<
    (expr: PublicodesExpression) => NGCEvaluatedNode | null
  >(() => (expr) => safeEvaluateHelper(expr, waterEngine), [waterEngine])

  const pristineEngine = useMemo(() => engine.shallowCopy(), [engine])

  const safeEvaluate = useMemo<
    (expr: PublicodesExpression) => NGCEvaluatedNode | null
  >(() => (expr) => safeEvaluateHelper(expr, engine), [engine])

  const safeGetRule = useMemo<(ruleName: DottedName) => NGCRuleNode | null>(
    () => (ruleName: DottedName) => safeGetRuleHelper(ruleName, engine),
    [engine]
  )

  return {
    engine,
    waterEngine,
    pristineEngine,
    safeEvaluate,
    safeGetRule,
    safeEvaluateWater,
  }
}
