'use client'

import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import Emoji from '@/design-system/utils/Emoji'
import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface Props {
  question: DottedName
  title?: string
  icons?: string
  description?: string
  setValue: (value: boolean) => void
  value: boolean | undefined | null
  index: number
}

const buttonClassNames = {
  inactive:
    'border-slate-500 text-primary-700 cursor-default border-2 bg-gray-100',
  checked: 'border-primary-700 text-primary-700 border-2 cursor-pointer ',
  unchecked: 'border-slate-500 hover:bg-primary-50 border-2 cursor-pointer ',
}
const checkClassNames = {
  checked: 'border-primary-700',
  unchecked: 'border-slate-400',
}

export default function MosaicAucunInput({
  question,
  title,
  icons,
  description,
  setValue,
  index,
  value,
}: Props) {
  const { t } = useClientTranslation()

  const status = value === true ? 'checked' : 'unchecked'

  const onClick = () => {
    setValue(!value)
  }

  return (
    <div>
      <label
        className={twMerge(
          `focus-within:ring-primary-700 relative flex h-full items-center gap-2 rounded-xl border! bg-white px-4 py-2 text-left transition-colors focus-within:ring-2 focus-within:ring-offset-2`,
          buttonClassNames[status]
        )}
        title={`${title} - ${status === 'checked' ? t('Sélectionné') : t('Sélectionner cette option')}`}>
        <input
          type="checkbox"
          aria-describedby={`${title}-soon-available`}
          className="sr-only"
          onChange={() => {
            onClick()
          }}
          onKeyDown={onKeyDownHelper(() => onClick())}
          data-cypress-id={`${question}-${value}`}
          id={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}
          checked={!!value}
        />

        <span
          className={`${checkClassNames[status]} flex h-5 w-5 items-center justify-center rounded-xs border-2 leading-4`}>
          {status === 'checked' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-primary-700 font-mono text-2xl">
              ✓
            </motion.div>
          ) : (
            ''
          )}
        </span>

        <div className="flex-1">
          {title && icons ? (
            <span
              aria-label={title}
              className="inline-block align-middle text-sm md:text-base">
              {title} <Emoji className="leading-tight">{icons ?? null}</Emoji>
            </span>
          ) : null}
          {description ? (
            <p className="mb-0 text-xs italic md:text-sm">
              {description.split('\n')[0]}
            </p>
          ) : null}
        </div>
      </label>
    </div>
  )
}
