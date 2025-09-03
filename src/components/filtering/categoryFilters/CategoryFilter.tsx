'use client'

import { FILTER_SEARCH_PARAM_KEY } from '@/constants/filtering'
import { trackingCategoryFilter } from '@/constants/tracking/misc'
import {
  getBackgroundColor,
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { encodeDottedNameAsURI } from '@/utils/format/encodeDottedNameAsURI'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type Props = {
  title: string
  dottedName: DottedName
  count: number
}

export default function CategoryFilter({ title, dottedName, count }: Props) {
  const router = useRouter()

  const { t } = useClientTranslation()

  const categorySelected = useSearchParams().get(FILTER_SEARCH_PARAM_KEY) || ''

  const encodedDottedName = encodeDottedNameAsURI(dottedName)

  const buildURL = () => {
    const siteURL = new URL(window.location.href)

    if (encodedDottedName === categorySelected) {
      siteURL.searchParams.delete(FILTER_SEARCH_PARAM_KEY)
    } else {
      siteURL.searchParams.set(FILTER_SEARCH_PARAM_KEY, encodedDottedName)
    }

    return siteURL.toString()
  }

  const isSelected = categorySelected === encodedDottedName

  return (
    <li
      className={twMerge(
        'height-[1.8rem] rounded-md border-2 border-transparent transition-colors',
        !categorySelected || isSelected
          ? `${getBackgroundLightColor(dottedName)} ${getBorderColor(dottedName)}`
          : `bg-gray-100`
      )}
      style={{
        backgroundColor: getBackgroundColor(),
      }}>
      <button
        title={`${title} - ${isSelected ? t('Page active') : t('Sélectionner ce filtre et afficher uniquement les actions de cette catégorie')}`}
        className={twMerge(
          'p-2 text-xs font-bold',
          getTextDarkColor(dottedName)
        )}
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
