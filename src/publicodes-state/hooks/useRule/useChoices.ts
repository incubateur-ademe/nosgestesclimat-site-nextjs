'use client'

import type { NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'
import useEngine from '../useEngine'
type Props = {
  rule: NGCRuleNode | null | any // Model shenanigans: question alimentation . local . consommation is missing "formule"
  type: string | undefined
}

export default function useChoices({ rule, type }: Props) {
  const { engine } = useEngine()
  const choices = useMemo<(string | number)[] | null>(() => {
    if (type === 'choices' && engine) {
      const possibilities = engine
        .getPossibilitiesFor(rule.dottedName)
        ?.map(({ nodeValue }) => nodeValue)

      return possibilities ?? []
    }
    return null
  }, [rule, type, engine])

  return choices
}
