'use client'

import { useMemo } from 'react'

type Props = {
  dottedName: string
  type: string
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useMosaic({
  dottedName,
  type,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props) {
  const questionsOfMosaic = useMemo(() => {
    if (type === 'mosaic') {
      return everyMosaicChildWhoIsReallyInMosaic.filter((mosaicChild) =>
        mosaicChild.includes(dottedName)
      )
    }
    return []
  }, [dottedName, type, everyMosaicChildWhoIsReallyInMosaic])

  return { questionsOfMosaic }
}
