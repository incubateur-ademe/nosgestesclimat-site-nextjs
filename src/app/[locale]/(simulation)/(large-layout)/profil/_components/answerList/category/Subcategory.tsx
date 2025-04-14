'use client'

import { profilClickSubCategory } from '@/constants/tracking/pages/profil'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import {
  getBackgroundColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useForm, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import Question from './subcategory/Question'

type Props = {
  subcategory: DottedName
}

export default function SubCategory({ subcategory }: Props) {
  const { title, numericValue, icons, category } = useRule(subcategory)
  const { relevantAnsweredQuestions } = useForm()

  const [isOpen, setIsOpen] = useState(false)

  const formattedCarbonFootprint = formatCarbonFootprint(numericValue)

  //TODO: Model shenanigans: investigate why subcategory = repas and questions = plats
  const answeredQuestionOfSubcategory = relevantAnsweredQuestions.filter(
    (question) =>
      question.includes(subcategory) ||
      (question.includes('plats') && subcategory.includes('repas'))
  )

  if (!answeredQuestionOfSubcategory.length) return null
  return (
    <div className="relative mt-2 w-full rounded-xl bg-gray-50">
      <button
        onClick={() => {
          trackEvent(profilClickSubCategory(subcategory))
          setIsOpen((prevIsOpen) => !prevIsOpen)
        }}
        className="relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-xl p-4 pl-6 text-lg font-bold">
        <div
          className={`absolute top-0 bottom-0 left-0 w-2 ${getBackgroundColor(
            category
          )}`}
        />
        {icons} {title}{' '}
        <span
          className={`block rounded-xl border-2 ${getBorderColor(category)} bg-white px-4 py-2 text-sm ${getTextDarkColor(category)}`}>
          {formattedCarbonFootprint.formattedValue}{' '}
          {formattedCarbonFootprint.unit}
        </span>
      </button>
      {isOpen ? (
        <div className="pr-4 pb-2 pl-6">
          {answeredQuestionOfSubcategory.map((question) => (
            <Question key={question} question={question} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
