import { safeGetRuleHelper } from '@/publicodes-state/helpers/safeGetRuleHelper'
import Engine from 'publicodes'
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
export default function useEngine(rules: Rules) {
  const engine = useMemo<Engine>(() => {
    const nbRules = Object.keys(rules).length
    console.time(`⚙️ Parsing ${nbRules}`)
    const engine = new Engine(rules, {
      logger: {
        log: console.log,
        warn: () => null,
        error: console.error,
      },
    })
    console.timeEnd(`⚙️ Parsing ${nbRules}`)
    return engine
  }, [rules])

  const pristineEngine = useMemo(() => engine.shallowCopy(), [engine])

  const safeEvaluate = useMemo<
    (dottedName: DottedName) => NGCEvaluatedNode | null
  >(
    () => (dottedName: DottedName) => safeEvaluateHelper(dottedName, engine),
    [engine]
  )

  const safeGetRule = useMemo<(dottedName: DottedName) => NGCRuleNode | null>(
    () => (dottedName: DottedName) => safeGetRuleHelper(dottedName, engine),
    [engine]
  )

  return { engine, pristineEngine, safeEvaluate, safeGetRule }
}
