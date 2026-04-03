import { useCurrentSimulation, useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

interface Props {
  question: DottedName
  updateValue: (
    value: undefined
  ) => void | Dispatch<SetStateAction<string | number | null | undefined>>
}

export function useResetOnClickDontKnow({ question, updateValue }: Props) {
  const { isFolded, questionsOfMosaicFromParent } = useRule(question)

  const { situation } = useCurrentSimulation()

  // Reset currentValue if question is withdrawn from the situation
  useEffect(() => {
    const isQuestionRemoved = !Object.keys(situation).some(
      (key) => key === question
    )

    const mosaicChildrenRemoved =
      questionsOfMosaicFromParent.length === 0 ||
      questionsOfMosaicFromParent.every(
        (child) => !Object.keys(situation).some((key) => key === child)
      )

    if (isFolded && isQuestionRemoved && mosaicChildrenRemoved) {
      updateValue(undefined)
    }
  }, [situation, isFolded, question, updateValue, questionsOfMosaicFromParent])
}
