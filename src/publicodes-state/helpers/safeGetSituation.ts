import { NodeValue, Situation } from '../types'

export const safeGetSituation = ({
  situation,
  everyRules,
}: {
  situation: Situation
  everyRules: string[]
}): any =>
  everyRules
    .filter((rule: string) => situation[rule] || situation[rule] === 0)
    .reduce(
      (accumulator: Record<string, NodeValue>, currentValue: string) => ({
        ...accumulator,
        [currentValue]: situation[currentValue],
      }),
      {}
    )
