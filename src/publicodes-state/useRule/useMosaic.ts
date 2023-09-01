'use client'

import { useMemo } from 'react'

type Props = {
  dottedName: string
  rule: any
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

  const shouldDisplayAucun = useMemo(
    () => rule.rawNode.mosaique?.type === 'selection',
    [rule]
  )

  return { questionsOfMosaic, shouldDisplayAucun }
}
