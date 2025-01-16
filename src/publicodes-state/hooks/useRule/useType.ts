'use client'

import type { DottedName, NGCRuleNode } from '@abc-transitionbascarbone/near-modele'
import type { EvaluatedNode } from 'publicodes'
import { useMemo } from 'react'
import getType from '../../helpers/getType'

type Props = {
  dottedName: DottedName
  rule: NGCRuleNode | undefined
  evaluation: EvaluatedNode | null
}

export default function useType({ dottedName, rule, evaluation }: Props) {
  // Model shenanigans

  const type = useMemo<
    'notQuestion' | 'mosaic' | 'choices' | 'boolean' | 'number' | undefined
  >(() => {
    return getType({ dottedName, rule, evaluation })
  }, [dottedName, rule, evaluation])

  return { type, getType }
}
