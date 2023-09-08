'use client'

import { useMemo } from 'react'
import { NGCRuleNode } from '../types'

type Props = {
  dottedName: string
  rule: NGCRuleNode | null
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useMosaic({
  dottedName,
  rule,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props) {
  const questionsOfMosaic = useMemo<string[]>(
    () =>
      everyMosaicChildWhoIsReallyInMosaic.filter((mosaicChild) =>
        mosaicChild.includes(dottedName)
      ) || [],
    [dottedName, everyMosaicChildWhoIsReallyInMosaic]
  )

  const shouldDisplayAucun = useMemo<boolean>(
    () => rule?.rawNode?.mosaique?.type === 'selection',
    [rule]
  )

  const parent = useMemo<string>(() => {
    const dottedNameArray = dottedName.split(' . ')
    dottedNameArray.pop()
    return dottedNameArray.join(' . ')
  }, [dottedName])

  return { questionsOfMosaic, shouldDisplayAucun, parent }
}
