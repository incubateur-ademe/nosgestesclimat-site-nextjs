'use client'

import { useMemo } from 'react'
import getQuestionsOfMosaic from '../../helpers/getQuestionsOfMosaic'

type Props = {
  dottedName: string
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useMosaic({
  dottedName,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props) {
  const questionsOfMosaic = useMemo<string[]>(
    () =>
      getQuestionsOfMosaic({
        dottedName,
        everyMosaicChildWhoIsReallyInMosaic,
      }),
    [dottedName, everyMosaicChildWhoIsReallyInMosaic]
  )

  const parent = useMemo<string>(() => {
    const dottedNameArray = dottedName.split(' . ')
    dottedNameArray.pop()
    return dottedNameArray.join(' . ')
  }, [dottedName])

  return { questionsOfMosaic, parent }
}
