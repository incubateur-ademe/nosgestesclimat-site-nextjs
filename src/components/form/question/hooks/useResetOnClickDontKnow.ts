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
  const { isFolded } = useRule(question)

  const { situation } = useCurrentSimulation()

  // Reset currentValue if question is withdrawn from the situation
  useEffect(() => {
    if (isFolded && !Object.keys(situation).some((key) => key === question)) {
      updateValue(undefined)
    }
  }, [situation, isFolded, question, updateValue])
}
