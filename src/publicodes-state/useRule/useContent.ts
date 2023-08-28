'use client'

import { useMemo } from 'react'

type Props = {
  dottedName: string
  rule: any
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useContent({ dottedName, rule }: Props) {
  const category = useMemo(() => dottedName.split(' . ')[0], [dottedName])

  const title = useMemo(
    () => rule.rawNode.titre || rule.titre || rule.title, // Model shenanigans
    [rule]
  )
  const label = useMemo(() => rule.rawNode.question, [rule])
  const description = useMemo(() => rule.rawNode.description, [rule])
  const icons = useMemo(() => rule.rawNode['icônes'], [rule])
  const unit = useMemo(() => rule.rawNode['unité'], [rule])
  const color = useMemo(() => rule.rawNode['couleur'], [rule])

  const suggestions = useMemo(() => {
    const suggestionsFolder =
      rule.rawNode.mosaique?.suggestions || rule.rawNode.suggestions
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
    suggestions,
  }
}
