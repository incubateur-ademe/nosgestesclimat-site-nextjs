'use client'

import CountryListItem from '@/components/misc/CountryListItem'
import { sortSupportedRegions } from '@/helpers/localisation/sortSupportedRegions'
import { useLocale } from '@/hooks/useLocale'
import { SuppportedRegions } from '@/types/international'
import { capitaliseString } from '@/utils/capitaliseString'
import { HTMLAttributes } from 'react'

type Props = {
  supportedRegions: SuppportedRegions
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
    <ul
      className={`region-grid mx-auto mt-4 grid max-w-[760px] gap-4 p-0 ${className}`}
      {...props}
    >
      {Object.entries(sortedSupportedRegions).map(([code, params]) => {
        return (
          <li className="my-2 flex list-none justify-center" key={code}>
            <CountryListItem
              code={code}
              shouldShowButton={shouldShowButton}
              label={capitaliseString(params[locale]?.nom as string) ?? ''}
              isSelected={code === selectedRegionCode}
              updateCurrentRegion={updateCurrentRegion}
            />
          </li>
        )
      })}
    </ul>
  )
}
