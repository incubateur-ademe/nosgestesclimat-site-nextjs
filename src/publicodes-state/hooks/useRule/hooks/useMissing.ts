'use client'

import getIsMissing from '@/publicodes-state/helpers/getIsMissing'
import type { Situation } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'

type Props = {
  dottedName: DottedName
  questionsOfMosaicFromParent?: DottedName[]
  situation: Situation
  foldedSteps: string[]
}

export default function useMissing({
  dottedName,
  situation,
  questionsOfMosaicFromParent = [],
  foldedSteps,
}: Props) {
  const isMissing = useMemo(
    () =>
      getIsMissing({
        dottedName,
        situation,
        questionsOfMosaicFromParent,
      }),
    [dottedName, situation, questionsOfMosaicFromParent]
  )

  const isFolded = useMemo(
    () => foldedSteps.indexOf(dottedName) >= 0,
    [dottedName, foldedSteps]
  )

  return {
    isMissing,
    isFolded,
  }
}
