'use client'

import { useMemo } from 'react'

type Props = {
  dottedName: string
  rule: any
  type: string
}

export default function useChoices({ dottedName, rule, type }: Props) {
  const choices = useMemo(() => {
    if (type === 'choices') {
      const unePossibilite: any = rule.rawNode.formule
        ? rule.rawNode.formule['une possibilité']
        : rule.rawNode['une possibilité']
      if (unePossibilite) {
        return unePossibilite['possibilités']
      } else {
        return []
      }
    }
    return null
  }, [rule, type])

  return choices
}
