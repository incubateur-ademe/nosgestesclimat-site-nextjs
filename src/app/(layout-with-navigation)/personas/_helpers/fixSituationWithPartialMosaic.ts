import getQuestionsOfMosaic from '@/publicodes-state/helpers/getQuestionsOfMosaic'
import getType from '@/publicodes-state/helpers/getType'
import {
  DottedName,
  NGCEvaluatedNode,
  NGCRuleNode,
} from '@/publicodes-state/types'
import { Situation } from '@/types/simulation'
import { PublicodesExpression } from 'publicodes'

type Props = {
  situation: Situation
  everyMosaic: DottedName[]
  everyMosaicChildren: DottedName[]
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
}

const getMosaicChildrenGroup = (
  situation: Situation,
  expectedMosaicGroup: DottedName[]
) => {
  return Object.keys(situation).filter(([key]) =>
    expectedMosaicGroup.includes(key)
  )
}

export const fixSituationWithPartialMosaic = ({
  situation,
  everyMosaic,
  everyMosaicChildren,
  safeGetRule,
  safeEvaluate,
}: Props) => {
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

    if (situationMosaicGroup.length === 0) {
      return
    }

    expectedMosaicGroup.forEach((dottedName) => {
      if (!situationMosaicGroup.includes(dottedName)) {
        const rule = safeGetRule(dottedName)
        const evaluation = safeEvaluate(dottedName)
        const valueToReset =
          getType({ dottedName, rule, evaluation }) === 'boolean' ? 'non' : 0
        situation[dottedName] = valueToReset
      }
    })
  })

  return situation
}
