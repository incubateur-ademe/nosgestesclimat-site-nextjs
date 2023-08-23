'use client'

import { useLocale } from '@/hooks/useLocale'
import { capitaliseString } from '@/utils/capitaliseString'
import { use } from 'react'
import { fetchSupportedRegions } from '../_helpers/fetchSupportedRegions'
import { sortSupportedRegions } from '../_helpers/sortSupportedRegions'
import CountryListItem from './CountryListItem'

export default function RegionGrid({ shouldShowButton = true }) {
	const supportedRegions: string[] = use(fetchSupportedRegions)

	const locale = useLocale()

	const sortedSupportedRegions = sortSupportedRegions(
		supportedRegions,
		locale || 'fr',
	)

	return (
		<ul className="region-grid mx-auto mt-4 grid max-w-[760px] gap-4 p-0">
			{Object.entries(sortedSupportedRegions).map(([code, params]) => {
				return (
					<li className="my-2 flex list-none justify-center" key={code}>
						<CountryListItem
							code={code}
							shouldShowButton={shouldShowButton}
							label={
								capitaliseString(params[locale || 'fr']?.nom as string) ?? ''
							}
							isSelected={code === locale}
						/>
					</li>
				)
			})}
		</ul>
	)
}
