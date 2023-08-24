'use client'

import { useMemo } from 'react'

type Props = {
  dottedName: string
  engine: any
  rule: any
  type: string
  everyMosaicChildWhoIsReallyInMosaic: string[]
}

export default function useMosaic({
  dottedName,
  engine,
  rule,
  type,
  everyMosaicChildWhoIsReallyInMosaic,
}: Props) {
  const everyRules = useMemo(
    () => Object.keys(engine.getParsedRules()),
    [engine]
  )

  const childrenOfMosaic = useMemo<string[]>(
    () =>
      type === 'mosaic'
        ? rule?.rawNode?.formule?.somme?.map(
            (child: string) => dottedName + ' . ' + child
          ) ||
          everyRules.filter((rule) => {
            const dottedNameDepth = dottedName.split(' . ').length
            const ruleDepth = rule.split(' . ').length
            return (
              rule.includes(dottedName) && ruleDepth === dottedNameDepth + 1
            )
          }) ||
          []
        : [],

    [dottedName, everyRules, rule, type]
  )

  const questionsOfMosaic = useMemo<string[]>(
    () =>
      everyMosaicChildWhoIsReallyInMosaic.filter((mosaicChild) =>
        mosaicChild.includes(dottedName)
      ),
    [dottedName, everyMosaicChildWhoIsReallyInMosaic]
  )

  return { childrenOfMosaic, questionsOfMosaic }
}
