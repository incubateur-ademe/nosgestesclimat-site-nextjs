'use client'

import { useMemo } from 'react'
import getType from '../../helpers/getType'
import { NGCEvaluatedNode, NGCRuleNode } from '../../types'

type Props = {
  dottedName: string
  rule: NGCRuleNode | null
  evaluation: NGCEvaluatedNode | null
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
