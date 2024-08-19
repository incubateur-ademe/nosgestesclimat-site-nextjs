import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
import Engine from 'publicodes'
import { Situation } from '../types'

const engine = new Engine(rules)

export const useTempEngine = jest.fn(() => {
  return {
    rules,
    getRuleObject: engine.getRule.bind(engine),
  }
})

export const useDisposableEngine = jest.fn(() => {
  return {
    getValue: (dottedName: DottedName) => {
      try {
        return engine.evaluate.bind(engine)(dottedName).nodeValue
      } catch (e) {
        return null
      }
    },
    updateSituation: (newSituation: Situation) =>
      engine.setSituation.bind(engine)(newSituation, {
        keepPreviousSituation: true,
      }),
  }
})
