'use client'

import useEngine from '@/publicodes-state/hooks/useEngine/useEngine'
import type { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'
interface Props {
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
