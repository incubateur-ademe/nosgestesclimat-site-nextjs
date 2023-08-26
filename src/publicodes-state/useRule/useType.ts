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
    if (!rule.rawNode.question) {
      return 'notQuestion'
    }
    if (rule.rawNode.mosaique) {
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
      return 'choices'
    }
    return 'number'
  }
  const type = useMemo(() => {
    return getType({ dottedName, rule, evaluation })
  }, [dottedName, rule, evaluation])

  return { type, getType }
}
