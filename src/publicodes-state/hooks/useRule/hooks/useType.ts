'use client'

import getType from '@/publicodes-state/helpers/getType'
import type { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode } from 'publicodes'
import { useMemo } from 'react'

type Props = {
  dottedName: DottedName
  rule: NGCRuleNode | undefined
  evaluation: EvaluatedNode | null
}

export default function useType({ dottedName, rule, evaluation }: Props) {
  const type = useMemo<
    'notQuestion' | 'mosaic' | 'choices' | 'boolean' | 'number' | undefined
  >(() => {
    return getType({ dottedName, rule, evaluation })
  }, [dottedName, rule, evaluation])

  return { type, getType }
}
