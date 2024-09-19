import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
import Engine from 'publicodes'
import getSomme from '../helpers/getSomme'
import { Situation } from '../types'

const engine = new Engine(rules)

export const useTempEngine = jest.fn(() => {
  return {
    rules,
    getSpecialRuleObject: engine.getRule.bind(engine),
  }
})

export const useDisposableEngine = jest.fn(() => {
  const engineEvaluate = engine.evaluate.bind(engine)
  const engineSetSituation = engine.setSituation.bind(engine)
  const engineGetRule = engine.getRule.bind(engine)

  return {
    getValue: (dottedName: DottedName) => {
      try {
        return engineEvaluate(dottedName).nodeValue
      } catch (e) {
        return null
      }
    },
    updateSituation: (newSituation: Situation) =>
      engineSetSituation(newSituation, {
        keepPreviousSituation: true,
      }),
    getSubcategories: (dottedName: DottedName) =>
      getSomme(engineGetRule(dottedName)?.rawNode)?.map(
        (subCategory) => `${dottedName} . ${subCategory}`
      ),
  }
})
