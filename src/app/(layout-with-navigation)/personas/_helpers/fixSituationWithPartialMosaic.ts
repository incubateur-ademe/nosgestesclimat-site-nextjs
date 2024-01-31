import getQuestionsOfMosaic from '@/publicodes-state/helpers/getQuestionsOfMosaic'
import getType from '@/publicodes-state/helpers/getType'
import { DottedName } from '@/publicodes-state/types'
import { Situation } from '@/types/simulation'

const getMosaicChildrenGroup = (
  situation: Situation,
  expectedMosaicGroup: DottedName[]
) => {
  return Object.fromEntries(
    Object.entries(situation).filter(([key]) =>
      expectedMosaicGroup.includes(key)
    )
  )
}
export const fixSituationWithPartialMosaic = (
  situation: Situation,
  everyMosaic: DottedName[],
  everyMosaicChildren: DottedName[],
  safeGetRule: any,
  safeEvaluate: any
) => {
  // We take every mosaic questions and check if all or part of their children are in the situation.
  // If not answers are set in situation, we consider all mosaic answers to be 'non' or 0.
  everyMosaic.forEach((mosaic) => {
    const expectedMosaicGroup = getQuestionsOfMosaic({
      dottedName: mosaic,
      everyMosaicChildren,
    })
    const situationMosaicGroup = getMosaicChildrenGroup(
      situation,
      expectedMosaicGroup
    )
    expectedMosaicGroup.forEach((dottedName) => {
      if (!Object.keys(situationMosaicGroup).includes(dottedName)) {
        const rule = safeGetRule(dottedName)
        const evaluation = safeEvaluate(dottedName)
        const resetValue =
          getType({ rule, evaluation, dottedName }) === 'boolean' ? 'non' : 0
        situation[dottedName] = resetValue
      }
    })
  })
  return situation
}
