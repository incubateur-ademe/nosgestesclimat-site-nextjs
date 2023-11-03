'use client'

import { NGCRuleNode } from '@/publicodes-state/types'
import { useMemo } from 'react'
import getQuestionsOfMosaic from '../../helpers/getQuestionsOfMosaic'

type Props = {
  dottedName: string
  everyMosaicChildWhoIsReallyInMosaic: string[]
  rule: NGCRuleNode | null
}

export default function useMosaic({
  dottedName,
  everyMosaicChildWhoIsReallyInMosaic,
  rule,
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

  const mosaicType = rule?.rawNode?.mosaique?.type

  return { questionsOfMosaic, parent, mosaicType }
}
