import { safeGetSituation } from '@/publicodes-state/helpers/safeGetSituation'
import { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import Engine from 'publicodes'

export function generateEngine(rules: NGCRules, options: any = {}) {
  if (!rules) return null

  const engine = new Engine(rules, options)

  engine.prevEvaluate = engine.evaluate

  engine.evaluate = (dottedName: DottedName) => {
    const situation = engine.getSituation()

    engine.setSituation(
      safeGetSituation({
        situation: { ...situation, métrique: 'carbone' },
        everyRules: Object.keys(rules),
      })
    )

    const carbonEvaluation = engine.prevEvaluate(dottedName)

    engine.setSituation(
      safeGetSituation({
        situation: { ...situation, métrique: 'eau' },
        everyRules: Object.keys(rules),
      })
    )

    const waterEvaluation = engine.prevEvaluate(dottedName)

    return {
      carbon: carbonEvaluation,
      water: waterEvaluation,
    }
  }

  return engine
}
