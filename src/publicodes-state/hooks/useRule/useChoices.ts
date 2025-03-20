'use client'

import type { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'
import useEngine from '../useEngine'
type Props = {
  rule: NGCRuleNode | undefined
  type: string | undefined
}

export default function useChoices({ rule, type }: Props) {
  const { engine } = useEngine()
  const choices = useMemo<(string | number)[] | null>(() => {
    if (type === 'choices' && engine) {
      const possibilities = engine
        .getPossibilitiesFor(rule?.dottedName as DottedName)
        ?.map(({ nodeValue }) => nodeValue)

      return possibilities ?? []
    }
    return null
  }, [rule, type, engine])

  return choices
}
