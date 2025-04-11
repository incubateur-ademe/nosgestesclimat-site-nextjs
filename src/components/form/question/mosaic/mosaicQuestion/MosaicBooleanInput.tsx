'use client'

import Trans from '@/components/translation/trans/TransClient'
import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import Emoji from '@/design-system/utils/Emoji'
import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

type Props = {
  question: DottedName
  title?: string
  icons?: string
  description?: string
  setValue: (value: string) => void
  index: number
}

const buttonClassNames = {
  inactive:
    'border-primary-200 text-primary-700 cursor-default border-2 bg-gray-100',
  checked: 'border-primary-700 text-primary-700 border-2 cursor-pointer ',
  unchecked: 'border-primary-200 hover:bg-primary-50 border-2 cursor-pointer ',
}
const checkClassNames = {
  inactive: 'border-primary-200',
  checked: 'border-primary-700',
  unchecked: 'border-primary-200',
}

const labelClassNames = {
  inactive: 'text-primary-700',
  checked: 'text-primary-700',
  unchecked: 'text-primary-700',
}

export default function MosaicBooleanInput({
  question,
  title,
  icons,
  description,
  setValue,
  index,
  ...props
}: Props) {
  const { value, isMissing, isInactive } = useRule(question)

  const { t } = useClientTranslation()

  const status = isInactive
    ? 'inactive'
    : !isMissing && value
      ? 'checked'
      : 'unchecked'

  const onClick = () => {
    setValue(value ? 'non' : 'oui')
  }

  return (
    <div className="flex md:block">
      <label
        className={twMerge(
          `focus-within:ring-primary-700 relative flex h-full items-center gap-2 rounded-xl border bg-white px-4 py-2 text-left transition-colors focus-within:ring-2`,
          buttonClassNames[status]
        )}
        htmlFor={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}>
        <input
          type="checkbox"
          aria-disabled={isInactive}
          aria-describedby={isInactive ? `${title}-soon-available` : undefined}
          className="sr-only"
          onClick={() => {
            if (isInactive) return
            onClick()
          }}
          onKeyDown={!isInactive ? onKeyDownHelper(() => onClick()) : undefined}
          data-cypress-id={`${question}-${value}`}
          id={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}
          {...props}
        />

        <span
          className={`${checkClassNames[status]} flex h-5 w-5 items-center justify-center rounded-xs border-2 leading-4`}>
          {status === 'checked' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`font-mono text-2xl ${labelClassNames[status]}`}>
              ✓
            </motion.div>
          ) : (
            ''
          )}
        </span>

        <div className="flex-1">
          {title && icons ? (
            <span
              aria-label={`${title} ${isInactive ? t('Bientôt disponible') : ''}`}
              className={`inline-block align-middle text-sm md:text-lg ${labelClassNames[status]}`}>
              {title} <Emoji className="">{icons ?? null}</Emoji>
            </span>
          ) : null}
          {description ? (
            <p className="mb-0 text-xs italic md:text-sm">
              {description.split('\n')[0]}
            </p>
          ) : null}
        </div>
        {isInactive ? (
          <p
            id={`${title}-soon-available`}
            className="border-secondary-200 bg-secondary-50 text-secondary-800 absolute right-0 -bottom-6 mb-0 flex items-center justify-center rounded-xl border-2 px-1.5 py-1 text-xs font-semibold">
            <Trans>Bientôt disponible</Trans>
          </p>
        ) : null}
      </label>
    </div>
  )
}
