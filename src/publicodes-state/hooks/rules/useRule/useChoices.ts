'use client'

import { useMemo } from 'react'
import { NGCRuleNode } from '../../types'

type Props = {
  rule: NGCRuleNode | null | any // Model shenanigans: question alimentation . local . consommation is missing "formule"
  type: string | undefined
}

export default function useChoices({ rule, type }: Props) {
  const choices = useMemo<string[]>(() => {
    if (type === 'choices') {
      // Model shenanigans: sometimes "une possibilité" is in rawNode, sometimes it is in formule
      const unePossibilite: any = rule?.rawNode.formule
        ? rule?.rawNode.formule['une possibilité']
        : rule?.rawNode['une possibilité']
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
