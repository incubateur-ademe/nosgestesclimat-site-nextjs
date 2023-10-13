'use client'

import { useMemo } from 'react'
import getIsMissing from '../helpers/getIsMissing'
import { RuleName, Situation } from '../types'

type Props = {
  dottedName: RuleName
  questionsOfMosaic: RuleName[]
  situation: Situation
}

export default function ({ dottedName, situation, questionsOfMosaic }: Props): {
  isMissing: boolean
} {
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
