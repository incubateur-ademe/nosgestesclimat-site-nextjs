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
import Button from '@/design-system/buttons/Button'
import { useUpdatePageTitle } from '@/hooks/simulation/useUpdatePageTitle'
import { useLocale } from '@/hooks/useLocale'
import { useFormState, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Evaluation } from 'publicodes'
import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/trans/TransClient'
import Warning from './question/Warning'

interface Props {
  question: DottedName
  showInputsLabel?: React.ReactNode | string
  headingLevel?: 1 | 2 | 3
  className?: string
  secondaryQuestionsOfMosaic?: DottedName[]
}

export default function Question({
  question,
  showInputsLabel,
  headingLevel,
  className,
  secondaryQuestionsOfMosaic,
}: Props) {
  const {
    type,
    label,
    description,
    unit,
    value,
    situationValue,
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

  const currentCategoryQuestions = questionsByCategories[category]

  const refCurrentCategoryQuestions = useRef(currentCategoryQuestions)

  // Set dynamically the page title
  useUpdatePageTitle({
    category,
    countCategoryQuestions: currentCategoryQuestions.length,
    currentQuestionIndex:
      refCurrentCategoryQuestions.current.indexOf(question) + 1,
  })

  const [isOpen, setIsOpen] = useState(showInputsLabel ? false : true)
  const locale = useLocale()
  return (
    <>
      <div className={twMerge('mb-6 flex flex-col items-start', className)}>
        <Label
          question={question}
          label={label}
          description={description}
          headingLevel={headingLevel}
          id="question-label"
        />

        <Suggestions
          question={question}
          setValue={(value) => {
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
                value={situationValue as Evaluation<number>}
                setValue={(value) => {
                  setValue(value, { questionDottedName: question })
                }}
                placeholder={
                  isMissing && typeof value === 'number'
                    ? value.toLocaleString(locale, {
                        maximumFractionDigits: value < 10 ? 1 : 0,
                      })
                    : ''
                }
                data-testid={question}
                id={DEFAULT_FOCUS_ELEMENT_ID}
                aria-describedby={`${QUESTION_DESCRIPTION_BUTTON_ID}-content warning-message notification-message`}
                aria-labelledby="question-label"
              />
            )}

            {type === 'boolean' && (
              <BooleanInput
                value={situationValue as Evaluation<boolean>}
                setValue={(value: string | undefined) => {
                  {
                    setValue(value, { questionDottedName: question })
                    trackEvent(
                      questionChooseAnswer({ question, answer: value })
                    )
                  }
                }}
                data-testid={question}
                label={label || ''}
                firstInputId={DEFAULT_FOCUS_ELEMENT_ID}
                aria-describedby={`${QUESTION_DESCRIPTION_BUTTON_ID}-content warning-message notification-message`}
                aria-labelledby="question-label"
              />
            )}

            {type === 'choices' && (
              <ChoicesInput
                question={question}
                choices={choices}
                value={situationValue as Evaluation<string>}
                setValue={(value) => {
                  {
                    setValue(value, { questionDottedName: question })
                    trackEvent(
                      questionChooseAnswer({ question, answer: value })
                    )
                  }
                }}
                data-testid={question}
                label={label || ''}
                firstInputId={DEFAULT_FOCUS_ELEMENT_ID}
                aria-describedby={`${QUESTION_DESCRIPTION_BUTTON_ID}-content warning-message notification-message`}
                aria-labelledby="question-label"
              />
            )}

            {(type === 'numberMosaic' || type === 'selectMosaic') && (
              <Mosaic
                question={question}
                questionsOfMosaic={questionsOfMosaicFromParent}
                aria-describedby={`${QUESTION_DESCRIPTION_BUTTON_ID}-content  warning-message notification-message`}
                secondaryQuestionsOfMosaic={secondaryQuestionsOfMosaic}
                aria-labelledby="question-label"
                firstInputId={DEFAULT_FOCUS_ELEMENT_ID}
                label={label || ''}
              />
            )}
          </>
        )}
      </div>
      {typeof situationValue === 'number' && (
        <Warning
          type={type}
          plancher={plancher}
          plafond={plafond}
          warning={warning}
          value={situationValue}
          unit={unit}
        />
      )}

      {assistance ? (
        <Assistance question={question} assistance={assistance} />
      ) : null}

      {activeNotifications.length > 0 && (
        <Notification
          notification={activeNotifications[activeNotifications.length - 1]}
        />
      )}
    </>
  )
}
