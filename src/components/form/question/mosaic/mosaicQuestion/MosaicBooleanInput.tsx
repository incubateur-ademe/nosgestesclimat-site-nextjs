import Trans from '@/components/translation/Trans'
import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { motion } from 'framer-motion'

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
    'border-primary-200 bg-primary-100 text-primary-400 cursor-default border-2',
  checked: 'border-primary-700 text-primary-700 border-2',
  unchecked: 'border-primary-200 hover:bg-primary-50 border-2',
}
const checkClassNames = {
  inactive: 'border-primary-200',
  checked: 'border-primary-700',
  unchecked: 'border-primary-200',
}

const labelClassNames = {
  inactive: 'text-primary-500',
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

  const status = isInactive
    ? 'inactive'
    : !isMissing && value
      ? 'checked'
      : 'unchecked'
  return (
    <div className="flex md:block">
      <label
        className={`relative flex h-full cursor-pointer items-center gap-2 rounded-xl border bg-white px-4 py-2 text-left transition-colors ${buttonClassNames[status]}`}
        htmlFor={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}>
        <input
          type="checkbox"
          disabled={isInactive}
          className="absolute h-[1px] w-[1px] opacity-0"
          onClick={() => {
            setValue(value ? 'non' : 'oui')
          }}
          data-cypress-id={`${question}-${value}`}
          id={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}
          {...props}
        />

        <span
          className={`${checkClassNames[status]} flex h-5 w-5 items-center justify-center rounded-sm border-2 leading-4`}>
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
              className={`inline-block align-middle text-sm md:text-lg ${labelClassNames[status]}`}>
              <Emoji className="">
                {title}
                {icons ? <> {icons}</> : null}
              </Emoji>
            </span>
          ) : null}
          {description ? (
            <p className="mb-0 text-xs italic md:text-sm">
              {description.split('\n')[0]}
            </p>
          ) : null}
        </div>
        {isInactive ? (
          <div className="absolute bottom-1 right-4 top-1 flex -rotate-12 items-center justify-center rounded-xl border-2 border-black bg-white p-2 text-xs font-semibold text-black">
            <Trans>Bientôt disponible</Trans>
          </div>
        ) : null}
      </label>
    </div>
  )
}
