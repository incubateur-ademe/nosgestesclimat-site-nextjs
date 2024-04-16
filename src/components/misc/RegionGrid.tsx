'use client'

import CountryListItem from '@/components/misc/CountryListItem'
import { sortSupportedRegions } from '@/helpers/localisation/sortSupportedRegions'
import { useLocale } from '@/hooks/useLocale'
import { capitalizeString } from '@/utils/capitalizeString'
import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import { HTMLAttributes } from 'react'

type Props = {
  supportedRegions: SupportedRegions
  shouldShowButton?: boolean
  selectedRegionCode?: string
  updateCurrentRegion?: (code: string) => void
  className?: string
}

export default function RegionGrid({
  supportedRegions,
  shouldShowButton = true,
  selectedRegionCode,
  updateCurrentRegion,
  className,
  ...props
}: Props & HTMLAttributes<HTMLUListElement>) {
  const locale = useLocale()

  const sortedSupportedRegions = sortSupportedRegions({
    supportedRegions,
    currentLocale: locale,
  })

  return (
    <ul className={`region-grid mt-4 grid gap-4 p-0 ${className}`} {...props}>
      {Object.entries(sortedSupportedRegions).map(([code, params]) => {
        return typeof params !== 'string' ? (
          <li className="my-2 flex list-none justify-center" key={code}>
            <CountryListItem
              code={code}
              shouldShowButton={shouldShowButton}
              label={capitalizeString(params[locale]?.nom as string) ?? ''}
              isSelected={code === selectedRegionCode}
              updateCurrentRegion={updateCurrentRegion}
            />
          </li>
        ) : null
      })}
    </ul>
  )
}
