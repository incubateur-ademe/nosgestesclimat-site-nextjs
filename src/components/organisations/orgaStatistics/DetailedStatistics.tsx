'use client'

import ChevronRight from '@/components/icons/ChevronRight'
import TransClient from '@/components/translation/trans/TransClient'
import { organisationsDashboardClickFunFacts } from '@/constants/tracking/pages/organisationsDashboard'
import Button from '@/design-system/inputs/Button'
import type { Entries } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import type { DottedName, FunFacts } from '@incubateur-ademe/nosgestesclimat'
import importedFunFacts from '@incubateur-ademe/nosgestesclimat/public/funFactsRules.json'
import { utils } from 'publicodes'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import DetailedFunFacts from './funFacts/DetailedFunFacts'

const funFactsRules = importedFunFacts as { [k in keyof FunFacts]: DottedName }

const defaultFunFactsRules: { [k in keyof Partial<FunFacts>]: DottedName } = {
  percentageOfBicycleUsers: 'ui . organisations . transport . roule en vélo',
  percentageOfVegetarians: 'ui . organisations . alimentation . est végétarien',
  percentageOfCarOwners: 'ui . organisations . transport . roule en voiture',
}

const plusFunFactsRules: { [k in keyof Partial<FunFacts>]: DottedName } =
  Object.fromEntries(
    Object.entries(funFactsRules).filter(
      ([key]) => !(key in defaultFunFactsRules)
    )
  )

type Props = { funFacts?: FunFacts }
export default function DetailedStatistics({ funFacts }: Props) {
  const [isSectionVisible, setIsSectionVisible] = useState(false)

  const funFactsByCategory = {} as Record<
    DottedName,
    [keyof Partial<FunFacts>, DottedName | undefined][]
  >

  const plusFunFactsRulesEntries = Object.entries(plusFunFactsRules) as Entries<
    typeof plusFunFactsRules
  >

  plusFunFactsRulesEntries.forEach((item) => {
    if (!item[1]) return
    const parent = utils.ruleParent(item[1]) as DottedName
    funFactsByCategory[parent] = [...(funFactsByCategory[parent] || []), item]
  })

  if (!funFacts) return null

  return (
    <div className="flex flex-col">
      <Button
        className="px-4! my-4 w-36 self-center md:self-end"
        color="link"
        onClick={() => {
          trackEvent(organisationsDashboardClickFunFacts)
          setIsSectionVisible(!isSectionVisible)
        }}>
        <ChevronRight
          className={twMerge(
            'mr-2 rotate-90',
            isSectionVisible && '-rotate-90'
          )}
        />
        <span className="w-24">
          {!isSectionVisible ? (
            <TransClient>Voir plus</TransClient>
          ) : (
            <TransClient>Voir moins</TransClient>
          )}
        </span>
      </Button>

      {isSectionVisible && (
        <DetailedFunFacts
          funFacts={funFacts}
          plusFunFactsRules={plusFunFactsRules}
        />
      )}
    </div>
  )
}
