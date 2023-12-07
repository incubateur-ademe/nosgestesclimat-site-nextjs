'use client'

import { useMemo } from 'react'
import getQuestionsOfMosaic from '../../helpers/getQuestionsOfMosaic'

type Props = {
  dottedName: string
  everyMosaicChildren: string[]
}

export default function useMosaic({ dottedName, everyMosaicChildren }: Props) {
  const questionsOfMosaic = useMemo<string[]>(
    () =>
      getQuestionsOfMosaic({
        dottedName,
        everyMosaicChildren,
      }),
    [dottedName, everyMosaicChildren]
  )

  const parent = useMemo<string>(() => {
    const dottedNameArray = dottedName.split(' . ')
    dottedNameArray.pop()
    return dottedNameArray.join(' . ')
  }, [dottedName])

  return { questionsOfMosaic, parent }
}
