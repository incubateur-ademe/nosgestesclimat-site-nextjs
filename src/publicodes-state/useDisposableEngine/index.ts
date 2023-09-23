import Engine from 'publicodes'
import { useMemo } from 'react'
import { safeEvaluateHelper } from '../helpers/safeEvaluateHelper'
import { safeGetSituation } from '../helpers/safeGetSituation'
import { Situation } from '../types'

type Props = {
  rules?: any
  situation: Situation
}
/**
 * A hook that set up a separate engine to use for calculation.
 *
 * Very ressource intensive. Use with caution
 */
export default function useDisposableEngine({ rules, situation }: Props) {
  const engine = useMemo(
    () =>
      new Engine(rules).setSituation(
        safeGetSituation({ situation, everyRules: Object.keys(rules) })
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

  const updateSituation = (newSituation: any) => {
    engine.setSituation(
      safeGetSituation({
        situation: newSituation,
        everyRules: Object.keys(rules),
      })
    )
  }

  return {
    getValue,
    updateSituation,
  }
}
