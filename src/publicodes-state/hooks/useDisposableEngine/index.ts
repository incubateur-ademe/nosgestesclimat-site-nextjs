import Engine from 'publicodes'
import { useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
import { safeGetSituation } from '../../helpers/safeGetSituation'
import { Situation } from '../../types'

type Props = {
  rules?: NGCRules
  situation: Situation
}

/**
 * A hook that set up a separate engine, only used to evaluate a specific rule.
 *
 * @note There is no impact on the state current application's state.
 *
 * @note It's very ressource intensive, you should use it with caution.
 */
export default function useDisposableEngine({ rules, situation }: Props) {
  const engine = useMemo(
    () =>
      new Engine(rules).setSituation(
        safeGetSituation({
          situation,
          everyRules: Object.keys(rules ?? {}),
        })
      ),
    [rules, situation]
  )

  const safeEvaluate = useMemo(
    () =>
      (rule: string, engineUsed = engine) =>
        safeEvaluateHelper(rule, engineUsed),
    [engine]
  )

  const getValue = (dottedName: string) =>
    safeEvaluate(dottedName, engine)?.nodeValue

  const updateSituation = (newSituation: Situation) => {
    engine.setSituation(
      safeGetSituation({
        situation: newSituation,
        everyRules: Object.keys(rules ?? {}),
      })
    )
  }

  return {
    getValue,
    updateSituation,
  }
}
