import { SimulationContext } from '@/publicodes-state/providers/simulationProvider/context'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Engine from 'publicodes'
import { useContext, useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
import { Situation } from '../../types'

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
  const { rules: contextRules } = useContext(SimulationContext)

  const engine = useMemo(() => {
    return new Engine(rules ?? contextRules, {
      logger: { warn: () => {}, error: () => {}, log: () => {} },
      strict: {
        situation: false,
        noOrphanRule: false,
      },
    }).setSituation(situation)
  }, [contextRules, rules, situation])

  const safeEvaluate = useMemo(
    () =>
      (rule: DottedName, engineUsed = engine) =>
        safeEvaluateHelper(rule, engineUsed),
    [engine]
  )

  const getValue = (dottedName: DottedName) =>
    safeEvaluate(dottedName, engine)?.nodeValue

  const updateSituation = (newSituation: Situation) => {
    engine.setSituation(newSituation, { keepPreviousSituation: true })
  }

  return {
    engine,
    getValue,
    updateSituation,
  }
}
