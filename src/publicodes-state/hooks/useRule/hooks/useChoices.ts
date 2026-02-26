'use client'

import useEngine from '@/publicodes-state/hooks/useEngine/useEngine'
import type { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'
import { useMemo } from 'react'
interface Props {
  rule: NGCRuleNode | undefined
  type: string | undefined
}

export default function useChoices({ rule, type }: Props) {
  const { safeEvaluate, engine } = useEngine()
  const choices = useMemo<(string | number)[] | null>(() => {
    if (type === 'choices' && engine) {
      const possibilities = engine
        .getPossibilitiesFor(rule?.dottedName as DottedName)
        ?.reduce(
          (acc, { nodeValue }) => {
            // We can't use `filterNotApplicable` option from `getPossibilitiesFor` here because we can't enable filterNotApplicablePossibilities engine flag as it raises a "Maximum call stack size exceeded" error difficult to investigate. So we filter manually here.
            const fullPossibilityDottedName = utils.disambiguateReference(
              engine.getParsedRules() ?? {},
              rule?.dottedName,
              nodeValue as string
            )
            const isPossibilityApplicable =
              safeEvaluate({
                'est applicable': fullPossibilityDottedName,
              })?.nodeValue === true

            if (isPossibilityApplicable) {
              acc.push(nodeValue)
            }
            return acc
          },
          [] as (string | number)[]
        )

      return possibilities ?? []
    }
    return null
  }, [rule, type, engine, safeEvaluate])

  return choices
}
