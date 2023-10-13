'use client'

import { RuleName } from '@/publicodes-state/types'
import { useMemo } from 'react'
import getQuestionsOfMosaic from '../../helpers/getQuestionsOfMosaic'

type Props = {
  dottedName: RuleName
  everyMosaicChildWhoIsReallyInMosaic: RuleName[]
}

export default function useMosaic({
  dottedName,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props) {
  const questionsOfMosaic = useMemo<RuleName[]>(
    () =>
      getQuestionsOfMosaic({
        dottedName,
        everyMosaicChildWhoIsReallyInMosaic,
      }),
    [dottedName, everyMosaicChildWhoIsReallyInMosaic]
  )

  const parent = useMemo<RuleName>(() => {
    const dottedNameArray = dottedName.split(' . ')
    dottedNameArray.pop()
    return dottedNameArray.join(' . ')
  }, [dottedName])

  return { questionsOfMosaic, parent }
}
