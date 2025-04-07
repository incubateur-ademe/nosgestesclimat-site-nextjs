'use client'

import { FILTER_SEARCH_PARAM_KEY } from '@/constants/filtering'
import { trackingCategoryFilter } from '@/constants/tracking/misc'
import {
  getBackgroundColor,
  getBackgroundLightColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { encodeDottedNameAsURI } from '@/utils/format/encodeDottedNameAsURI'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  title: string
  dottedName: DottedName
  count: number
}

export default function CategoryFilter({ title, dottedName, count }: Props) {
  const router = useRouter()

  const categorySelected = useSearchParams().get(FILTER_SEARCH_PARAM_KEY) || ''

  const encodedDottedName = encodeDottedNameAsURI(dottedName)

  const isSelected = categorySelected === encodedDottedName

  const buildURL = () => {
    const siteURL = new URL(
      `${window.location.origin}${window.location.pathname}`
    )

    if (isSelected && encodedDottedName === categorySelected) {
      siteURL.searchParams.delete(FILTER_SEARCH_PARAM_KEY)
    }

    if (isSelected && encodedDottedName !== categorySelected) {
      siteURL.searchParams.set(FILTER_SEARCH_PARAM_KEY, encodedDottedName)
    }

    if (!isSelected) {
      siteURL.searchParams.append(FILTER_SEARCH_PARAM_KEY, encodedDottedName)
    }

    return siteURL.toString()
  }

  return (
    <li
      className={`height-[1.8rem] rounded-md ${
        !categorySelected || isSelected
          ? getBackgroundLightColor(dottedName)
          : 'bg-gray-200'
      }`}
      style={{
        backgroundColor: getBackgroundColor(),
      }}>
      <button
        className={`p-2 text-xs font-bold ${getTextDarkColor(dottedName)}`}
        onClick={() => {
          trackEvent(
            trackingCategoryFilter(dottedName, window.location.pathname)
          )
          router.replace(buildURL(), {
            scroll: false,
          })
        }}>
        {title}{' '}
        <span
          className={`ml-2 inline-block w-4 rounded-full bg-white ${getTextDarkColor(dottedName)}`}>
          {count ?? 0}
        </span>
      </button>
    </li>
  )
}
