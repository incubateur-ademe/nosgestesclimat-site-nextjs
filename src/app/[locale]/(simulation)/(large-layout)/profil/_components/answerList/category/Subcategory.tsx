'use client'

import { profilClickSubCategory } from '@/constants/tracking/pages/profil'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import {
  getBackgroundColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useFormState, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import Question from './subcategory/Question'

type Props = {
  subcategory: DottedName
}

export default function SubCategory({ subcategory }: Props) {
  const { title, numericValue, icons, category } = useRule(subcategory)
  const { relevantAnsweredQuestions } = useFormState()

  const [isOpen, setIsOpen] = useState(false)

  const formattedCarbonFootprint = formatCarbonFootprint(numericValue)

  //TODO: Model shenanigans: investigate why subcategory = repas and questions = plats
  const answeredQuestionOfSubcategory = relevantAnsweredQuestions.filter(
    (question) =>
      question.includes(subcategory) ||
      (question.includes('plats') && subcategory.includes('repas'))
  )

  if (!answeredQuestionOfSubcategory.length) return null

  const safeId = `subcategory-${String(subcategory).replace(/[^a-zA-Z0-9_-]/g, '-')}`
  const buttonId = `${safeId}-button`
  const panelId = `${safeId}-panel`

  return (
    <li
      className="relative mt-2 w-full list-none rounded-xl bg-gray-50"
      role="listitem">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          trackEvent(profilClickSubCategory(subcategory))
          setIsOpen((prevIsOpen) => !prevIsOpen)
        }}
        className="focus-visible:outline-primary-600 relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-xl p-4 pl-6 text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-2">
        <div
          className={`absolute top-0 bottom-0 left-0 w-2 ${getBackgroundColor(
            category
          )}`}
        />
        <span>
          <Emoji className="mr-2">{icons}</Emoji> {title}{' '}
        </span>
        <span
          className={`block rounded-xl border-2 ${getBorderColor(category)} bg-white px-4 py-2 text-sm ${getTextDarkColor(category)}`}>
          {formattedCarbonFootprint.formattedValue}{' '}
          {formattedCarbonFootprint.unit}
        </span>
      </button>
      <div
        id={panelId}
        role="group"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pr-4 pb-2 pl-6">
        <ul role="list" className="m-0 list-none p-0">
          {answeredQuestionOfSubcategory.map((question) => (
            <li key={question} className="list-none">
              <Question question={question} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
