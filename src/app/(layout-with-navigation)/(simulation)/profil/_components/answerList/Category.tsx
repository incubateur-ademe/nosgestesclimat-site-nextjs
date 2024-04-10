'use client'

import { profilClickCategory } from '@/constants/tracking/pages/profil'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import {
  getBackgroundLightColor,
  getBorderColor,
} from '@/helpers/getCategoryColorClass'
import { useRule, useSimulation } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import QuestionsWithoutSubcategory from './category/QuestionsWithoutSubcategory'
import Subcategory from './category/Subcategory'

type Props = {
  category: DottedName
}

function getTextDarkColor(category?: string | null) {
  switch (category) {
    case 'transport':
      return `text-blue-dark`
    case 'alimentation':
      return `text-orange-dark`
    case 'logement':
      return `text-emerald-dark`
    case 'divers':
      return `text-yellow-dark`
    case 'services sociétaux':
      return `text-lavender-dark`
    default:
      return 'text-primary-700'
  }
}

export default function Category({ category }: Props) {
  const { title, numericValue, icons } = useRule(category)
  const { subcategories } = useSimulation()

  const [isOpen, setIsOpen] = useState(false)
  const formattedCarbonFootprint = formatCarbonFootprint(numericValue)

  return (
    <div className="relative mb-4 w-full">
      <div className="text-blue-default text-emerald-default text-lavender-default text-orange-default text-yellow-default opacity-0" />
      <button
        disabled={!subcategories[category].length}
        className="block w-full"
        onClick={() => {
          trackEvent(profilClickCategory(category))
          setIsOpen((prevIsOpen) => !prevIsOpen)
        }}>
        <h3
          className={`mb-0 flex w-full items-center justify-between gap-4 rounded-xl p-4 ${getTextDarkColor(category)} ${getBackgroundLightColor(
            category
          )} border-2 transition-colors ${getBorderColor(category)}`}>
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
        <>
          {subcategories[category].map((subcategory) => (
            <Subcategory key={subcategory} subcategory={subcategory} />
          ))}
          <QuestionsWithoutSubcategory category={category} />
        </>
      ) : null}
    </div>
  )
}
