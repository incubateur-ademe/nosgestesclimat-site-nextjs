'use client'

import { DottedName } from '@/publicodes-state/types'
import { useMemo } from 'react'

export type Props = {
  options: DottedName[] | undefined
  everyMosaicChildren: DottedName[]
}
export default function useQuestionsOfMosaic({
  options,
  everyMosaicChildren,
}: Props): DottedName[] {
  const questionsOfMosaic = useMemo<DottedName[]>(
    () =>
      options?.map(
        (mosaicName) =>
          // TODO: we should manage the case where options don't correspond to exisiting rules
          everyMosaicChildren.find((child) => child.endsWith(mosaicName)) ?? ''
      ) ?? [],
    [everyMosaicChildren, options]
  )

  return questionsOfMosaic
}
