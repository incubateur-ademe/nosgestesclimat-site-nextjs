'use client'

import { useMemo } from 'react'

type Props = {
  rule: any
  type: string
}

export default function useChoices({ rule, type }: Props) {
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
