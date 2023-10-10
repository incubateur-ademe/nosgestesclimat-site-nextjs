import { QUESTION_DESCRIPTION_BUTTON_ID } from '@/constants/accessibility'
import { getMatomoEventClickHelp } from '@/constants/matomo'
import Markdown from '@/design-system/utils/Markdown'
import { QuestionSize } from '@/types/values'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

type Props = {
  question: string
  label?: string
  description?: string
  size?: QuestionSize
  htmlFor?: string
}

const sizeClassNames = {
  sm: 'text-sm',
  md: 'text-lg md:text-xl',
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
  htmlFor,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation()

  if (!label) return
  return (
    <>
      <label
        className={`mb-3 ${sizeClassNames[size]} font-semibold`}
        aria-label={label}
        htmlFor={htmlFor}>
        {label}{' '}
        {description ? (
          <button
            onClick={() => {
              trackEvent(getMatomoEventClickHelp(question))
              setIsOpen((previsOpen) => !previsOpen)
            }}
            className={`inline-block ${buttonSizeClassNames[size]} rounded-full border-none bg-primary text-base font-bold text-white`}
            title={t("Voir plus d'informations")}
            id={QUESTION_DESCRIPTION_BUTTON_ID}>
            <code>i</code>
          </button>
        ) : null}
      </label>
      {isOpen && description ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="mb-3 origin-top">
          <Markdown>{description}</Markdown>{' '}
          <button
            onClick={() => setIsOpen(false)}
            className="block text-primary underline"
            title={t('Fermer')}>
            <Trans>Fermer</Trans>
          </button>
        </motion.div>
      ) : null}
    </>
  )
}
