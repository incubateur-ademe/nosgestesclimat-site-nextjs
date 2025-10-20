'use client'

import { profilClickCategory } from '@/constants/tracking/pages/profil'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import {
  getBackgroundLightColor,
  getBorderCategoryColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { getSubcatsOfCategory } from '@/helpers/publicodes/getSubcatsOfCategory'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import QuestionsWithoutSubcategory from './category/QuestionsWithoutSubcategory'
import Subcategory from './category/Subcategory'

type Props = {
  category: DottedName
}

export default function Category({ category }: Props) {
  const { title, numericValue, icons } = useRule(category)

  const { subcategories } = useEngine()

  const { t } = useClientTranslation()

  const [isOpen, setIsOpen] = useState(false)
  const formattedCarbonFootprint = formatCarbonFootprint(numericValue)

  const subcategoriesOfCategory = getSubcatsOfCategory(category, subcategories)

  const safeId = `category-${String(category).replace(/[^a-zA-Z0-9_-]/g, '-')}`
  const buttonId = `${safeId}-button`
  const panelId = `${safeId}-panel`

  return (
    <li className="relative mb-4 w-full" role="listitem">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={!subcategoriesOfCategory?.length}
        title={`${title} - ${isOpen ? t('profile.answers.category.fold', 'Replier les questions pour cette catégorie') : t('profile.answers.category.unfold', 'Déplier les questions pour cette catégorie')}`}
        className="focus:ring-primary-700 block w-full rounded-xl focus:ring-2 focus:ring-offset-3 focus:outline-hidden"
        onClick={() => {
          trackEvent(profilClickCategory(category))
          setIsOpen((prevIsOpen) => !prevIsOpen)
        }}>
        <h3
          className={`mb-0 flex w-full items-center justify-between gap-4 rounded-xl p-4 ${getTextDarkColor(category)} ${getBackgroundLightColor(
            category
          )} border-2 transition-colors ${getBorderCategoryColor(category, '800')}`}>
          <div className="flex items-center">
            <Emoji className="mr-3">{icons}</Emoji>
            <span>{title}</span>{' '}
          </div>

          <span
            className={`block rounded-xl border-2 ${getBorderColor(category)} bg-white px-4 py-2 text-lg ${getTextDarkColor(category)}`}>
            {formattedCarbonFootprint.formattedValue}{' '}
            {formattedCarbonFootprint.unit}
          </span>
        </h3>
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          hidden={!isOpen}>
          <ul role="list" className="mt-2 list-none p-0">
            {subcategoriesOfCategory?.map((subcategory) => (
              <li key={subcategory}>
                <Subcategory subcategory={subcategory} />
              </li>
            ))}
            <QuestionsWithoutSubcategory category={category} />
          </ul>
        </div>
      ) : null}
    </li>
  )
}
