import Engine from 'publicodes'
import { useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
import { safeGetSituation } from '../../helpers/safeGetSituation'
import { DottedName, Situation } from '../../types'

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
  const engine = useMemo(() => {
    return new Engine(rules, { allowOrphanRules: true }).setSituation(
      safeGetSituation({ situation, everyRules: Object.keys(rules) })
    )
  }, [rules, situation])

  const safeEvaluate = useMemo(
    () =>
      (rule: DottedName, engineUsed = engine) =>
        safeEvaluateHelper(rule, engineUsed),
    [engine]
  )

  const getValue = (dottedName: DottedName) =>
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
