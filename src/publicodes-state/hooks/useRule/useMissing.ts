'use client'

import { useMemo } from 'react'
import getIsMissing from '../../helpers/getIsMissing'
import { Situation } from '../../types'

type Props = {
  dottedName: string
  questionsOfMosaic: string[]
  situation: Situation
}

export default function useValue({
  dottedName,
  situation,
  questionsOfMosaic,
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

  return {
    isMissing,
  }
}
