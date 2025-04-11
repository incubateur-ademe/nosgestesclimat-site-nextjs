'use client'

import Assistance from '@/components/form/question/Assistance'
import BooleanInput from '@/components/form/question/BooleanInput'
import ChoicesInput from '@/components/form/question/ChoicesInput'
import Label from '@/components/form/question/Label'
import Mosaic from '@/components/form/question/Mosaic'
import Notification from '@/components/form/question/Notification'
import NumberInput from '@/components/form/question/NumberInput'
import Suggestions from '@/components/form/question/Suggestions'
import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import { questionChooseAnswer } from '@/constants/tracking/question'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useFormState, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/trans/TransClient'
import Warning from './question/Warning'

type Props = {
  question: DottedName
  tempValue?: number | undefined
  setTempValue?: (value: number | undefined) => void
  showInputsLabel?: React.ReactNode | string
  className?: string
}

export default function Question({
  question,
  tempValue,
  setTempValue,
  showInputsLabel,
  className,
}: Props) {
  const {
    type,
    label,
    description,
    unit,
    value,
    numericValue,
    setValue,
    isMissing,
    choices,
    assistance,
    questionsOfMosaicFromParent,
    activeNotifications,
    plancher,
    plafond,
    warning,
    category,
  } = useRule(question)

  const { questionsByCategories } = useFormState()

  const { t } = useClientTranslation()

  // It should happen only on mount (the component remount every time the question changes)
  const prevQuestion = useRef('')

  useEffect(() => {
    if (type !== 'number') {
      if (setTempValue) setTempValue(undefined)
      return
    }

    if (prevQuestion.current !== question) {
      if (setTempValue) setTempValue(numericValue)
      prevQuestion.current = question
    }
  }, [type, numericValue, setTempValue, question])

  const currentCategoryQuestions = questionsByCategories[category]

  const refCurrentCategoryQuestions = useRef(currentCategoryQuestions)

  // Update the page title when the question changes
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.title = t(
        `Calculateur, question ${refCurrentCategoryQuestions.current.indexOf(question) + 1} sur ${currentCategoryQuestions.length} de la catégorie ${category} - Nos Gestes Climat`
      )
    }
  }, [currentCategoryQuestions, category, t, question, prevQuestion])

  const [isOpen, setIsOpen] = useState(showInputsLabel ? false : true)

  return (
    <>
      <div className={twMerge('mb-6 flex flex-col items-start', className)}>
        <Label
          question={question}
          label={label}
          description={description}
          id="question-label"
          htmlFor={DEFAULT_FOCUS_ELEMENT_ID}
        />

        <Suggestions
          question={question}
          setValue={(value) => {
            if (type === 'number') {
              if (setTempValue) setTempValue(value as number)
            }
            setValue(value, { questionDottedName: question })
          }}
        />
        {showInputsLabel ? (
          <Button
            color="link"
            size="xs"
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
            className="mb-2">
            {isOpen ? <Trans>Fermer</Trans> : showInputsLabel}
          </Button>
        ) : null}
        {isOpen && (
          <>
            {type === 'number' && (
              <NumberInput
                unit={unit}
                value={setTempValue ? tempValue : numericValue}
                setValue={(value) => {
                  if (setTempValue) {
                    setTempValue(value)
                  }
                  setValue(value, { questionDottedName: question })
                }}
                isMissing={isMissing}
                min={0}
                data-cypress-id={question}
                id={DEFAULT_FOCUS_ELEMENT_ID}
                aria-describedby={QUESTION_DESCRIPTION_BUTTON_ID}
                aria-labelledby="question-label"
              />
            )}

            {type === 'boolean' && (
              <BooleanInput
                value={value}
                setValue={(value) => {
                  {
                    setValue(value, { questionDottedName: question })
                    trackEvent(
                      questionChooseAnswer({ question, answer: value })
                    )
                  }
                }}
                isMissing={isMissing}
                data-cypress-id={question}
                label={label || ''}
                firstInputId={DEFAULT_FOCUS_ELEMENT_ID}
                aria-describedby={QUESTION_DESCRIPTION_BUTTON_ID}
                aria-labelledby="question-label"
              />
            )}

            {type === 'choices' && (
              <ChoicesInput
                question={question}
                choices={choices}
                value={String(value)}
                setValue={(value) => {
                  {
                    setValue(value, { questionDottedName: question })
                    trackEvent(
                      questionChooseAnswer({ question, answer: value })
                    )
                  }
                }}
                isMissing={isMissing}
                data-cypress-id={question}
                label={label || ''}
                firstInputId={DEFAULT_FOCUS_ELEMENT_ID}
                aria-describedby={QUESTION_DESCRIPTION_BUTTON_ID}
                aria-labelledby="question-label"
              />
            )}

            {type === 'mosaic' && (
              <Mosaic
                question={question}
                questionsOfMosaic={questionsOfMosaicFromParent}
                aria-describedby={QUESTION_DESCRIPTION_BUTTON_ID}
                aria-labelledby="question-label"
                firstInputId={DEFAULT_FOCUS_ELEMENT_ID}
                label={label || ''}
              />
            )}
          </>
        )}
      </div>

      <Warning
        type={type}
        plancher={plancher}
        plafond={plafond}
        warning={warning}
        tempValue={tempValue}
        unit={unit}
      />

      {assistance ? (
        <Assistance
          question={question}
          assistance={assistance}
          setTempValue={setTempValue}
        />
      ) : null}

      {activeNotifications.map((notification) => (
        <Notification key={notification} notification={notification} />
      ))}
    </>
  )
}
