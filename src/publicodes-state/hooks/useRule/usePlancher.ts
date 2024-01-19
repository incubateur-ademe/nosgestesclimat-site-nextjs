'use client'

import { useMemo } from 'react'
import { NGCRuleNode } from '../../types'

type Props = {
  rule: NGCRuleNode | null
}

export default function usePlancher({ rule }: Props) {
  const plancher = useMemo<number | undefined>(() => {
    return rule?.rawNode?.plancher
  }, [rule?.rawNode?.plancher])

  const avertissement = useMemo<string | undefined>(() => {
    return rule?.rawNode?.avertissement
  }, [rule?.rawNode?.avertissement])

  return { plancher, avertissement }
}
