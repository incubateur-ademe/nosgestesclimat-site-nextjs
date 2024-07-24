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
  md: 'mb-6 text-lg md:text-2xl',
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
          `flex ${sizeClassNames[size]} font-semibold`,
          className
        )}
        aria-label={label}
        // This is a hack to avoid the default <label> element behavior
        // of triggering the first input (here the button) it
        onClick={(e) => e.preventDefault()}>
        <h1
          className={twMerge('mb-0 inline text-lg md:text-xl', titleClassName)}
          tabIndex={0}
          id={QUESTION_DESCRIPTION_BUTTON_ID}>
          <Markdown>{label}</Markdown>
        </h1>{' '}
        {description ? (
          <Button
            type="button"
            onClick={() => {
              if (isOpen) {
                trackEvent(questionCloseInfo({ question }))
              } else {
                trackEvent(questionOpenInfo({ question }))
              }
              setIsOpen((previsOpen) => !previsOpen)
            }}
            color="secondary"
            size="xs"
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full p-0 align-text-bottom font-mono`}
            title={t("Voir plus d'informations")}>
            i
          </Button>
        ) : null}
      </label>

      {isOpen && description ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="mb-3 origin-top rounded-xl border-2 border-primary-50 bg-white px-4 py-6 text-sm">
          <Markdown>{description}</Markdown>{' '}
          <Button
            size="sm"
            color={'secondary'}
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
