'use client'

import { useMemo } from 'react'
import getIsMissing from '../../helpers/getIsMissing'
import { DottedName, Situation } from '../../types'

type Props = {
  dottedName: DottedName
  questionsOfMosaic: string[]
  situation: Situation
  foldedSteps: string[]
}

export default function useMissing({
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
