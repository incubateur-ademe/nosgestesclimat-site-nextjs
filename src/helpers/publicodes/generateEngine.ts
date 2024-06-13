import { safeGetSituation } from '@/publicodes-state/helpers/safeGetSituation'
import { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import Engine, { Evaluation } from 'publicodes'

export function generateEngine(rules: NGCRules, options: any = {}) {
  if (!rules) return null

  const engine = new Engine(rules, options) as Engine & {
    evaluateWithMetric: (dottedName: DottedName) => Evaluation
  }

  engine.evaluateWithMetric = (
    dottedName: DottedName,
    metric: 'carbone' | 'eau' = 'carbone'
  ) => {
    engine.setSituation(
      safeGetSituation({
        situation: { métrique: metric },
        everyRules: Object.keys(rules),
      }),
      {
        keepPreviousSituation: true,
      }
    )

    return engine.evaluate(dottedName)
  }

  return engine
}
