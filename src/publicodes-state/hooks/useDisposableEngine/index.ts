import Engine from 'publicodes'
import { useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
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
    return new Engine(rules, {
      strict: {
        situation: false,
        noOrphanRule: false,
      },
    }).setSituation(situation)
  }, [rules, situation])

  const safeEvaluate = useMemo(
    () =>
      (rule: DottedName, engineUsed = engine) =>
        safeEvaluateHelper(rule, engineUsed),
    [engine]
  )

  const getValue = (dottedName: DottedName) =>
    safeEvaluate(dottedName, engine)?.nodeValue

  const updateSituation = (newSituation: Situation) => {
    // TODO : it seems that there is a bug with `keepPreviousSituation` option even if it should be used here.
    engine.setSituation(newSituation)
  }

  return {
    getValue,
    updateSituation,
  }
}
