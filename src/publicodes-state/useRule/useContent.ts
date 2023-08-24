'use client'

import { useMemo } from 'react'

type Props = {
  dottedName: string
  rule: any
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useContent({ dottedName, rule }: Props) {
  const category = useMemo(() => dottedName.split(' . ')[0], [dottedName])
  console.log(rule)
  const title = useMemo(
    () => rule.rawNode.titre || rule.titre || rule.title, //FFS
    [rule]
  )
  const label = useMemo(() => rule.rawNode.question, [rule])
  const description = useMemo(() => rule.rawNode.description, [rule])
  const icons = useMemo(() => rule.rawNode['icônes'], [rule])
  const unit = useMemo(() => rule.rawNode['unité'], [rule])
  const suggestions = useMemo(
    () =>
      rule.rawNode.suggestions
        ? Object.keys(rule.rawNode.suggestions).map((key: string) => ({
            label: key,
            value: rule.rawNode.suggestions[key],
          }))
        : [],
    [rule]
  )

  return { category, title, label, description, icons, unit, suggestions }
}
