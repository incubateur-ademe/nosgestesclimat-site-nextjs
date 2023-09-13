'use client'

import { useMemo } from 'react'
import { Situation } from '../types'

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
  const isMissing = useMemo(() => {
    if (situation[dottedName]) {
      return false
    }
    if (questionsOfMosaic.find((question) => situation[question])) {
      return false
    }
    return true
  }, [dottedName, situation, questionsOfMosaic])

  return {
    isMissing,
  }
}
