'use client'

import { useMemo } from 'react'
import getType from '../helpers/getType'
import {
  NGCEvaluatedNode,
  NGCQuestionType,
  NGCRuleNode,
  RuleName,
} from '../types'

type Props = {
  dottedName: RuleName
  rule: NGCRuleNode | null
  evaluation: NGCEvaluatedNode | null
}

export default function useType({ dottedName, rule, evaluation }: Props): {
  type: NGCQuestionType | undefined
  getType: (dottedName: Props) => NGCQuestionType | undefined
} {
  // Model shenanigans

  const type = useMemo<NGCQuestionType | undefined>(() => {
    return getType({ dottedName, rule, evaluation })
  }, [dottedName, rule, evaluation])

  return { type, getType }
}
