'use client'

import { useMemo } from 'react'
import { NGCRuleNode } from '../types'

type Props = {
  dottedName: string
  rule: NGCRuleNode | null
  safeGetRule: (rule: string) => NGCRuleNode | null
}

export default function useContent({ dottedName, rule, safeGetRule }: Props) {
  const category = useMemo(() => dottedName.split(' . ')[0], [dottedName])

  const title = useMemo(() => rule?.title, [rule])

  const label = useMemo(() => rule?.rawNode.question, [rule])
  const description = useMemo(() => rule?.rawNode.description, [rule])
  const icons = useMemo(() => rule?.rawNode['icônes'], [rule])
  const unit = useMemo(() => rule?.rawNode['unité'], [rule])
  const color = useMemo(
    () => safeGetRule(category)?.rawNode['couleur'],
    [category, safeGetRule]
  )
  const assistance = useMemo(() => rule?.rawNode['aide'], [rule])
  const isInactive = useMemo(() => rule?.rawNode['inactif'] === 'oui', [rule])

  const suggestions = useMemo(() => {
    const suggestionsFolder =
      rule?.rawNode.mosaique?.suggestions || rule?.rawNode.suggestions
    return suggestionsFolder
      ? Object.keys(suggestionsFolder).map((key: string) => ({
          label: key,
          value: suggestionsFolder[key],
        }))
      : []
  }, [rule])

  return {
    category,
    title,
    label,
    description,
    icons,
    unit,
    color,
    assistance,
    isInactive,
    suggestions,
  }
}
