import getIsMissing from '@/publicodes-state/helpers/getIsMissing'
import getType from '@/publicodes-state/helpers/getType'
import { checkValueValidity } from '@/publicodes-state/helpers/getValueValidity'
import { NGCEvaluatedNode, Situation } from '@/publicodes-state/types'
import { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { PublicodesExpression } from 'publicodes'
import { useMemo } from 'react'

type Props = {
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  dottedName: DottedName
  situation: Situation

  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
}
export default function useQuestionsOfMosaic({
  everyMosaicChildrenWithParent,
  dottedName,
  situation,
  safeGetRule,
  safeEvaluate,
}: Props) {
  const questionsOfMosaicFromParent = useMemo(
    () => everyMosaicChildrenWithParent[dottedName] || [],
    [everyMosaicChildrenWithParent, dottedName]
  )

  const questionsOfMosaicFromSibling = useMemo(
    () =>
      Object.values(everyMosaicChildrenWithParent).find((mosaicChildren) => {
        return mosaicChildren.includes(dottedName)
      }) || [],
    [everyMosaicChildrenWithParent, dottedName]
  )

  const mosaicResetSituation = useMemo((): Situation => {
    const situationToAdd = questionsOfMosaicFromSibling.reduce(
      (accumulator, mosaicChildDottedName) => {
        const isMissing = getIsMissing({
          dottedName: mosaicChildDottedName,
          situation,
        })
        if (!isMissing) return accumulator

        const rule = safeGetRule(mosaicChildDottedName)
        const evaluation = safeEvaluate(mosaicChildDottedName)
        const resetValue =
          getType({ rule, evaluation, dottedName: mosaicChildDottedName }) ===
          'boolean'
            ? 'non'
            : 0

        return {
          ...accumulator,
          [mosaicChildDottedName]: checkValueValidity({
            value: resetValue,
            type: getType({
              rule,
              evaluation,
              dottedName: mosaicChildDottedName,
            }),
          }),
        }
      },
      {}
    )

    return situationToAdd
  }, [situation, safeEvaluate, safeGetRule, questionsOfMosaicFromSibling])

  return {
    questionsOfMosaicFromParent,
    questionsOfMosaicFromSibling,
    mosaicResetSituation,
  }
}
