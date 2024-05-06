'use client'

import { profilClickSubCategory } from '@/constants/tracking/pages/profil'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import {
  getBackgroundColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useForm, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
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
    <div className="relative mt-2 w-full overflow-hidden rounded-xl bg-gray-50">
      <div
        className={`absolute bottom-0 left-0 top-0 w-2 ${getBackgroundColor(
          category
        )}`}
      />
      <button
        onClick={() => {
          trackEvent(profilClickSubCategory(subcategory))
          setIsOpen((prevIsOpen) => !prevIsOpen)
        }}
        className="flex w-full items-center justify-between gap-4 p-4 pl-6 text-lg font-bold">
        {icons} {title}{' '}
        <span
          className={`block rounded-xl border-2 ${getBorderColor(category)} bg-white px-4 py-2 text-sm ${getTextDarkColor(category)}`}>
          {formattedCarbonFootprint.formattedValue}{' '}
          {formattedCarbonFootprint.unit}
        </span>
      </button>
      {isOpen ? (
        <div className="pb-2 pl-6 pr-4">
          {answeredQuestionOfSubcategory.map((question) => (
            <Question key={question} question={question} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
