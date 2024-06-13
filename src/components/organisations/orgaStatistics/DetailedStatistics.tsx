'use client'

import Trans from '@/components/translation/Trans'
import { organisationsDashboardClickFunFacts } from '@/constants/tracking/pages/organisationsDashboard'
import ChevronRight from '@/design-system/icons/ChevronRight'
import Button from '@/design-system/inputs/Button'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { FunFacts } from '@incubateur-ademe/nosgestesclimat'
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

type Props = {
  funFacts?: FunFacts
}
export default function DetailedStatistics({ funFacts }: Props) {
  const [isSectionVisible, setIsSectionVisible] = useState(false)

  const funFactsByCategory: Record<DottedName, [string, DottedName][]> = {}

  Object.entries(plusFunFactsRules).forEach((item) => {
    const parent = utils.ruleParent(item[1]) as keyof typeof funFactsByCategory
    funFactsByCategory[parent] = [...(funFactsByCategory[parent] || []), item]
  })

  if (!funFacts) return null

  return (
    <div className="flex flex-col">
      <Button
        className="my-4 w-36 self-center !px-4 md:self-end"
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
            <Trans>Voir plus</Trans>
          ) : (
            <Trans>Voir moins</Trans>
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
