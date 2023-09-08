'use client'

import { useMemo } from 'react'
import { NGCEvaluatedNode, NGCRuleNode } from '../types'

type Props = {
  dottedName: string
  rule: NGCRuleNode | null
  evaluation: NGCEvaluatedNode | null
}

export default function useType({ dottedName, rule, evaluation }: Props) {
  // Model shenanigans
  const getType = ({
    dottedName,
    rule,
    evaluation,
  }: {
    dottedName: string
    rule: NGCRuleNode | null | any // Model shenanigans: question alimentation . local . consommation is missing "formule"
    evaluation: NGCEvaluatedNode | null
  }): string | undefined => {
    if (!rule || !evaluation) return

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

  const type = useMemo<string | undefined>(() => {
    return getType({ dottedName, rule, evaluation })
  }, [dottedName, rule, evaluation])

  return { type, getType }
}
