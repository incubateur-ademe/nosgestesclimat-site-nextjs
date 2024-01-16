import { DottedName, NodeValue, Situation } from '../types'

export const safeGetSituation = ({
  situation,
  everyRules,
}: {
  situation: Situation
  everyRules: DottedName[]
}): any =>
  everyRules
    .filter((rule: DottedName) => situation[rule] || situation[rule] === 0)
    .reduce(
      (accumulator: Record<string, NodeValue>, currentValue: string) => ({
        ...accumulator,
        [currentValue]: situation[currentValue],
      }),
      {}
    )
