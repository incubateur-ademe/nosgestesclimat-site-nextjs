/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client'

import Trans from '@/components/translation/trans/TransClient'
import { QUESTION_DESCRIPTION_BUTTON_ID } from '@/constants/accessibility'
import {
  questionCloseInfo,
  questionOpenInfo,
} from '@/constants/tracking/question'
import Button from '@/design-system/inputs/Button'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { QuestionSize } from '@/types/values'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { twMerge } from 'tailwind-merge'

type Props = {
  question: DottedName
  label?: string
  description?: string
  size?: QuestionSize
  className?: string
  titleClassName?: string
  id?: string
  htmlFor?: string
}

const sizeClassNames = { sm: 'mb-1 text-sm', md: 'mb-3 text-lg md:text-2xl' }

export default function Label({
  question,
  label,
  description,
  size = 'md',
  className,
  titleClassName,
  id,
  htmlFor,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useClientTranslation()

  if (!label) return
  return (
    <>
      <label
        className={twMerge(
          `flex ${sizeClassNames[size]} gap-2 font-semibold`,
          className
        )}
        id={id}
        htmlFor={htmlFor}
        aria-label={label}
        // This is a hack to avoid the default <label> element behavior
        // of triggering the first input (here the button) it
        onClick={(e) => e.preventDefault()}>
        <h2
          className={twMerge(
            'mb-0 inline flex-1 text-lg md:text-xl [&_p]:mb-0',
            titleClassName
          )}
          tabIndex={0}
          id={QUESTION_DESCRIPTION_BUTTON_ID}>
          <Markdown>{label}</Markdown>
        </h2>{' '}
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
      {question === 'logement . âge' && (
        <div className="mt-2 mb-6 text-xs italic md:text-sm">
          <Trans>
            Un petit doute ? L'info sera sûrement dans votre contrat d'assurance
            logement.
          </Trans>
        </div>
      )}
      {isOpen && description ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="border-primary-50 mb-3 origin-top rounded-xl border-2 bg-gray-100 p-3 text-sm">
          <Markdown className="[&>blockquote]:text-default [&>blockquote]:mt-0 [&>blockquote]:mb-2 [&>blockquote]:p-0 [&>p]:mb-2">
            {description}
          </Markdown>{' '}
          <Button
            size="xs"
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
