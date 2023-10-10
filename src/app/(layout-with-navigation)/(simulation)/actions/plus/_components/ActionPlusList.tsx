'use client'

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { useGetPRNumber } from '@/hooks/useGetPRNumber'
import { useTempEngine } from '@/publicodes-state'
import { NGCRule, NGCRules } from '@/publicodes-state/types'
import { utils } from 'publicodes'
import { useFetchDocumentation } from '../../_hooks/useFetchDocumentation'

export default function ActionPlusList() {
  const { rules } = useTempEngine()

  const { PRNumber } = useGetPRNumber()

  const { data: documentation } = useFetchDocumentation(PRNumber)

  if (!documentation) {
    return null
  }

  const plusListe = Object.entries(rules as NGCRules)
    .map(([dottedName, rule]) => ({ ...rule, dottedName }))
    .map((rule) => {
      const plus = documentation?.['actions-plus/' + rule.dottedName]
      return { ...rule, plus }
    })
    .filter((r) => r.plus)

  return (
    <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-3">
      {plusListe.map((rule) => (
        <li key={rule.dottedName}>
          <Card
            className="h-[12rem] flex-col items-center justify-center no-underline"
            tag={Link}
            href={'/actions/plus/' + utils.encodeRuleName(rule.dottedName)}>
            <div className="mb-8 text-2xl">{rule.icônes || '🎯'}</div>
            <div className="text-center">
              {getRuleTitle(
                rule as NGCRule & { dottedName: string; titre: string }
              )}
            </div>
          </Card>
        </li>
      ))}
    </ul>
  )
}
