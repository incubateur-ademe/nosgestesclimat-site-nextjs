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
  index: number
  isActive: boolean
  isSelected: boolean
  onTabActivate: () => void
}

export default function CategoryFilter({
  title,
  dottedName,
  count,
  index,
  isActive,
  isSelected,
  onTabActivate,
}: Props) {
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

  const handleClick = () => {
    onTabActivate()
    trackEvent(trackingCategoryFilter(dottedName, window.location.pathname))
    router.replace(buildURL(), {
      scroll: false,
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <button
      role="tab"
      id={`category-tab-${index}`}
      aria-selected={isSelected}
      aria-controls={`category-panel-${index}`}
      tabIndex={isActive ? 0 : -1}
      title={`${title} - ${isSelected ? t('Page active') : t('Sélectionner ce filtre et afficher uniquement les actions de cette catégorie')}`}
      className={twMerge(
        'height-[1.8rem] rounded-md border-2 border-transparent p-2 text-xs font-bold transition-colors',
        isSelected
          ? `${getBackgroundLightColor(dottedName)} ${getBorderColor(dottedName)}`
          : `bg-gray-100 hover:bg-gray-200`
      )}
      style={{
        backgroundColor: isSelected ? getBackgroundColor() : undefined,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
      <span className={getTextDarkColor(dottedName)}>
        {title}{' '}
        <span
          className={`ml-2 inline-block w-4 rounded-full bg-white ${getTextDarkColor(dottedName)}`}>
          {count ?? 0}
        </span>
      </span>
    </button>
  )
}
