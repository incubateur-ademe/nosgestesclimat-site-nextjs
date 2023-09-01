'use client'

import { useMemo } from 'react'

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
      everyMosaicChildWhoIsReallyInMosaic.filter((mosaicChild) =>
        mosaicChild.includes(dottedName)
      ) || [],
    [dottedName, everyMosaicChildWhoIsReallyInMosaic]
  )

  return { questionsOfMosaic }
}
