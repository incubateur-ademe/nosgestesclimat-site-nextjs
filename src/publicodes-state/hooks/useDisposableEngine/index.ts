import { carboneMetric } from '@/constants/metric'
import { safeGetRuleHelper } from '@/publicodes-state/helpers/safeGetRuleHelper'
import { SimulationContext } from '@/publicodes-state/providers/simulationProvider/context'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Engine, { PublicodesExpression } from 'publicodes'
import { useCallback, useContext, useMemo } from 'react'
import { safeEvaluateHelper } from '../../helpers/safeEvaluateHelper'
import { Metric, Situation } from '../../types'

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
    return new Engine<DottedName>(rules ?? contextRules, {
      logger: { warn: () => {}, error: () => {}, log: () => {} },
      strict: {
        situation: false,
        noOrphanRule: false,
      },
    }).setSituation(situation)
  }, [contextRules, rules, situation])

  const safeEvaluate = useCallback(
    (expr: PublicodesExpression, metric: Metric = carboneMetric) => {
      const exprWithContext = {
        valeur: expr,
        contexte: {
          métrique: `'${metric}'`,
        },
      }

      return safeEvaluateHelper(exprWithContext, engine ?? new Engine())
    },
    [engine]
  )

  const safeGetRule = useMemo(
    () =>
      (rule: DottedName, engineUsed = engine) =>
        safeGetRuleHelper(rule, engineUsed),
    [engine]
  )

  const getValue = (dottedName: DottedName) =>
    safeEvaluate(dottedName)?.nodeValue

  const updateSituation = (
    newSituation: Situation,
    keepPreviousSituation = true
  ) => {
    engine.setSituation(newSituation, { keepPreviousSituation })
  }

  return {
    engine,
    getValue,
    updateSituation,
    safeEvaluate,
    safeGetRule,
  }
}
