'use client'

import { useMemo } from 'react'

type Props = {
  rule: any
  type: string
}

//TODO : Use real choices and not dottedName
export default function useChoices({ rule, type }: Props) {
  const choices = useMemo(() => {
    if (type === 'choices') {
      const unePossibilite: any = rule.rawNode.formule
        ? rule.rawNode.formule['une possibilité']
        : rule.rawNode['une possibilité']
      if (unePossibilite) {
        return unePossibilite['possibilités'].map((choice: string) => ({
          value: `'${choice}'`,
          label: choice,
        }))
      } else {
        return [
          {
            value: 'non',
            label: 'Non',
          },
          {
            value: 'oui',
            label: 'Oui',
          },
        ]
      }
    }
    return null
  }, [rule, type])

  return choices
}
