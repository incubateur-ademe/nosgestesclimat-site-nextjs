import { RuleName, Situation } from '../types'

// FIXME(@EmileRolley): the function should return a Situation
export const safeGetSituation = ({
  situation,
  everyRules,
}: {
  situation: Situation
  everyRules: RuleName[]
}): any =>
  everyRules
    .filter((rule: RuleName) => situation[rule] || situation[rule] === 0)
    .reduce(
      (situationAcc: Situation, currentRule: RuleName) => ({
        ...situationAcc,
        [currentRule]: situation[currentRule],
      }),
      {}
    )
