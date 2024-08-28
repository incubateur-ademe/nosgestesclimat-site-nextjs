'use client'

import getType from '@/publicodes-state/helpers/getType'
import { NGCEvaluatedNode } from '@/publicodes-state/types'
import { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { useMemo } from 'react'

type Props = {
  dottedName: DottedName
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
