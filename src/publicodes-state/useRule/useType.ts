'use client'

import { useMemo } from 'react'

type Props = {
  dottedName: string
  rule: any
  evaluation: any
}

export default function useType({ dottedName, rule, evaluation }: Props) {
  // Model shenanigans
  const getType = ({
    dottedName,
    rule,
    evaluation,
  }: {
    dottedName: string
    rule: any
    evaluation: any
  }) => {
    if (!rule?.rawNode?.question) {
      return 'notQuestion'
    }
    if (rule?.rawNode?.mosaique) {
      return 'mosaic'
    }
    if (
      (evaluation.unit === undefined &&
        (rule.rawNode.type === 'booléen' || rule.rawNode.type === undefined) &&
        typeof evaluation.nodeValue !== 'number') ||
      dottedName.includes('présent') ||
      dottedName.includes('propriétaire') ||
      dottedName.includes('présent')
    ) {
      const unePossibilite: any = rule.rawNode.formule
        ? rule.rawNode.formule['une possibilité']
        : rule.rawNode['une possibilité']
      if (unePossibilite) {
        return 'choices'
      } else {
        return 'boolean'
      }
    }
    return 'number'
  }

  const type = useMemo(() => {
    return getType({ dottedName, rule, evaluation })
  }, [dottedName, rule, evaluation])

  return { type, getType }
}
