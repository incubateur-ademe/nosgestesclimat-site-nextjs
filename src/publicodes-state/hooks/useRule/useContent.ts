'use client'

import { useMemo } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../../tailwind.config'
import { NGCRuleNode, Suggestion } from '../../types'

type Props = {
  dottedName: string
  rule: NGCRuleNode | null
}

export default function useContent({ dottedName, rule }: Props) {
  const category = useMemo<string>(
    () => dottedName.split(' . ')[0],
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

  const color = useMemo<string | undefined>(() => {
    const twConfig = resolveConfig(tailwindConfig) as Record<string, any>
    return twConfig.theme?.colors?.categories[`${category}`]
  }, [category])

  const assistance = useMemo<string | undefined>(
    () => rule?.rawNode['aide'],
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

  const resume = useMemo<string | undefined>(
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
    color,
    assistance,
    isInactive,
    suggestions,
    resume,
  }
}
