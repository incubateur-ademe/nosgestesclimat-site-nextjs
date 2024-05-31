import { safeGetRuleHelper } from '@/publicodes-state/helpers/safeGetRuleHelper'
import { captureException } from '@sentry/react'
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
        log(msg: string) {
          console.log(`[publicodes:log] ${msg}`)
        },
        warn() {
          null
        },
        error(msg: string) {
          console.error(`[publicodes:error] ${msg}`)

          // If it's a situation error, we throw it to sentry
          if (msg.match(/[ Erreur lors de la mise à jour de la situation ]/)) {
            captureException(new Error(msg))
          }
        },
      },
      strict: {
        situation: false,
        noOrphanRule: false,
      },
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
