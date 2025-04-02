'use client'

import { actionsClickFilter } from '@/constants/tracking/pages/actions'
import {
  getBackgroundColor,
  getBackgroundLightColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  title: string
  dottedName: DottedName
  count: number
}

export default function CategoryFilter({ title, dottedName, count }: Props) {
  const router = useRouter()

  const categorySelected = useSearchParams().get('categories') || ''

  const isSelected = categorySelected === dottedName

  const buildURL = () => {
    const siteURL = new URL(
      `${window.location.origin}${window.location.pathname}`
    )

    if (isSelected && dottedName === categorySelected) {
      siteURL.searchParams.delete('categories')
    }

    if (isSelected && dottedName !== categorySelected) {
      siteURL.searchParams.set('categories', dottedName)
    }

    if (!isSelected) {
      siteURL.searchParams.append('categories', dottedName)
    }

    return siteURL.toString()
  }

  return (
    <li
      className={`height-[1.8rem] rounded-md ${
        !categorySelected || categorySelected === dottedName
          ? getBackgroundLightColor(dottedName)
          : 'bg-gray-200'
      }`}
      style={{
        backgroundColor: getBackgroundColor(),
      }}>
      <button
        className={`p-2 text-xs font-bold ${getTextDarkColor(dottedName)}`}
        onClick={() => {
          trackEvent(actionsClickFilter(dottedName))
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
