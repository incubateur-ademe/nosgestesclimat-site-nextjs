'use client'

import { useMemo } from 'react'
import getIsMissing from '../../helpers/getIsMissing'
import { Situation } from '../../types'

type Props = {
  dottedName: string
  questionsOfMosaic: string[]
  situation: Situation
  foldedSteps: string[]
}

export default function useValue({
  dottedName,
  situation,
  questionsOfMosaic,
  foldedSteps,
}: Props) {
  const isMissing = useMemo(
    () =>
      getIsMissing({
        dottedName,
        situation,
        questionsOfMosaic,
      }),
    [dottedName, situation, questionsOfMosaic]
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
