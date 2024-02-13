'use client'

import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { useMemo } from 'react'
import { DottedName, NGCRuleNode, Suggestion } from '../../types'

type Props = {
  dottedName: DottedName
  rule: NGCRuleNode | null
}

export default function useContent({ dottedName, rule }: Props) {
  const category = useMemo<string>(
    () => getNamespace(dottedName) ?? '',
    [dottedName]
  )

  const title = useMemo<string | undefined>(() => rule?.title, [rule])

  const abbreviatedTitle = useMemo<string | undefined>(
    () => rule?.rawNode.abréviation,
    [rule]
  )

  const label = useMemo<string | undefined>(
    () => rule?.rawNode.question,
    [rule]
  )
  const description = useMemo<string | undefined>(
    () => rule?.rawNode.description,
    [rule]
  )
  const icons = useMemo<string | undefined>(
    () => rule?.rawNode['icônes'],
    [rule]
  )
  const unit = useMemo<string | undefined>(() => rule?.rawNode['unité'], [rule])

  const assistance = useMemo<string | undefined>(
    () => rule?.rawNode['aide'],
    [rule]
  )

  const plancher = useMemo<number>(() => rule?.rawNode['plancher'] ?? 0, [rule])
  const warning = useMemo<string | undefined>(
    () => rule?.rawNode['avertissement'],
    [rule]
  )

  const isInactive = useMemo<boolean>(
    () => rule?.rawNode['inactif'] === 'oui',
    [rule]
  )

  const suggestions = useMemo<Suggestion[] | undefined>(() => {
    const suggestionsFolder =
      rule?.rawNode.mosaique?.suggestions || rule?.rawNode.suggestions
    return suggestionsFolder
      ? Object.keys(suggestionsFolder).map((key: string) => ({
          label: key,
          value: suggestionsFolder[key],
        }))
      : []
  }, [rule])

  const excerpt = useMemo<string | undefined>(
    () => rule?.rawNode['résumé'],
    [rule]
  )

  return {
    category,
    title,
    abbreviatedTitle,
    label,
    description,
    icons,
    unit,
    assistance,
    isInactive,
    suggestions,
    excerpt,
    plancher,
    warning,
  }
}
