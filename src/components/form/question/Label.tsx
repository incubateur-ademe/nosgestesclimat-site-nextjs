/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client'

import Trans from '@/components/translation/Trans'
import { QUESTION_DESCRIPTION_BUTTON_ID } from '@/constants/accessibility'
import {
  questionCloseInfo,
  questionOpenInfo,
} from '@/constants/tracking/question'
import Button from '@/design-system/inputs/Button'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { QuestionSize } from '@/types/values'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { twMerge } from 'tailwind-merge'

type Props = {
  question: string
  label?: string
  description?: string
  size?: QuestionSize
  className?: string
  titleClassName?: string
}

const sizeClassNames = {
  sm: 'mb-1 text-sm',
  md: 'mb-3 text-lg md:text-xl',
}
const buttonSizeClassNames = {
  sm: 'h-6 w-6 text-sm',
  md: 'h-6 w-6 text-sm md:h-8 md:w-8 md:text-base',
}
export default function Label({
  question,
  label,
  description,
  size = 'md',
  className,
  titleClassName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useClientTranslation()

  if (!label) return
  return (
    <>
      <label
        className={twMerge(
          `block ${sizeClassNames[size]} font-semibold`,
          className
        )}
        aria-label={label}
        // This is a hack to avoid the default <label> element behavior
        // of triggering the first input (here the button) it
        onClick={(e) => e.preventDefault()}>
        <h1
          className={twMerge(
            'mb-0 inline text-base md:text-lg',
            titleClassName
          )}
          tabIndex={0}
          id={QUESTION_DESCRIPTION_BUTTON_ID}>
          {label}
        </h1>{' '}
        {description ? (
          <button
            type="button"
            onClick={() => {
              if (isOpen) {
                trackEvent(questionCloseInfo({ question }))
              } else {
                trackEvent(questionOpenInfo({ question }))
              }
              setIsOpen((previsOpen) => !previsOpen)
            }}
            className={`inline-block ${buttonSizeClassNames[size]} rounded-full border-none bg-primary-700 font-mono text-base font-bold text-white`}
            title={t("Voir plus d'informations")}>
            i
          </button>
        ) : null}
      </label>

      {isOpen && description ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="mb-3 origin-top rounded-md bg-white p-2 text-sm">
          <Markdown>{description}</Markdown>{' '}
          <Button
            size="sm"
            onClick={() => {
              trackEvent(questionCloseInfo({ question }))
              setIsOpen(false)
            }}
            title={t('Fermer')}>
            <Trans>Fermer</Trans>
          </Button>
        </motion.div>
      ) : null}
    </>
  )
}
