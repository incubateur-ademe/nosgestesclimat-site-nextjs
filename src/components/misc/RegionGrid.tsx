'use client'

import CountryListItem from '@/components/misc/CountryListItem'
import { sortSupportedRegions } from '@/helpers/localisation/sortSupportedRegions'
import { useGetSupportedRegions } from '@/hooks/useGetSupportedRegions'
import { useLocale } from '@/hooks/useLocale'
import { capitaliseString } from '@/utils/capitaliseString'
import { HTMLAttributes } from 'react'

type Props = {
  shouldShowButton?: boolean
  selectedRegionCode?: string
  updateCurrentRegion?: (code: string) => void
  className?: string
}

export default function RegionGrid({
  shouldShowButton = true,
  selectedRegionCode,
  updateCurrentRegion,
  className,
  ...props
}: Props & HTMLAttributes<HTMLUListElement>) {
  const { data: supportedRegions } = useGetSupportedRegions()

  const locale = useLocale()

  const sortedSupportedRegions = sortSupportedRegions({
    supportedRegions,
    currentLocale: locale || 'fr',
  })

  return (
    <ul
      className={`region-grid mx-auto mt-4 grid max-w-[760px] gap-4 p-0 ${className}`}
      {...props}>
      {Object.entries(sortedSupportedRegions).map(([code, params]) => {
        return (
          <li className="my-2 flex list-none justify-center" key={code}>
            <CountryListItem
              code={code}
              shouldShowButton={shouldShowButton}
              label={
                capitaliseString(params[locale || 'fr']?.nom as string) ?? ''
              }
              isSelected={code === selectedRegionCode}
              updateCurrentRegion={updateCurrentRegion}
            />
          </li>
        )
      })}
    </ul>
  )
}
