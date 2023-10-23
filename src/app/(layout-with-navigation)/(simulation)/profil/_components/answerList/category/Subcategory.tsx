import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useForm, useRule } from '@/publicodes-state'
import { useState } from 'react'
import Question from './subcategory/Question'

type Props = {
  subcategory: string
}

export default function SubCategory({ subcategory }: Props) {
  const { title, value, icons, color } = useRule(subcategory)
  const { relevantAnsweredQuestions } = useForm()

  const [isOpen, setIsOpen] = useState(false)

  const formattedCarbonFootprint = formatCarbonFootprint(value)

  //TODO: investigate why subcategory = repas and questions = plats
  const answeredQuestionOfSubcategory = relevantAnsweredQuestions.filter(
    (question) =>
      question.includes(subcategory) ||
      (question.includes('plats') && subcategory.includes('repas'))
  )

  if (!answeredQuestionOfSubcategory.length) return null
  return (
    <div className="relative mt-2 w-full overflow-hidden rounded-lg bg-primaryLight ">
      <div
        className="absolute bottom-0 left-0 top-0 w-2"
        style={{ backgroundColor: color }}
      />
      <button
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        className="flex w-full items-center justify-between gap-4 p-4 pl-6 text-lg font-bold">
        {icons} {title}{' '}
        <span className="block rounded-lg bg-white px-4 py-2 text-base">
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
