import Trans from '@/components/translation/Trans'
import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'

type Props = {
  question: string
  title?: string
  icons?: string
  description?: string
  setValue: (value: string) => void
  index: number
}

const buttonClassNames = {
  inactive: 'border-grey-500 bg-gray-100 text-gray-400 cursor-default',
  checked: 'border-primary-700 bg-primary-200 text-primary-700 border-2',
  unchecked: 'border-gray-300 bg-white text-primary-700 hover:bg-primary-100',
}
const checkClassNames = {
  inactive: 'border-gray-300',
  checked: 'border-primary-700',
  unchecked: 'border-gray-300',
}

const labelClassNames = {
  inactive: 'text-gray-500',
  checked: 'text-primary-700',
  unchecked: 'text-gray-700',
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
    <label
      className={`relative flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-left transition-colors ${buttonClassNames[status]}`}
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
            className={`text-sm font-medium md:text-xl ${labelClassNames[status]}`}>
            {title}&nbsp;{icons}
          </span>
        ) : null}
        {description ? (
          <>
            <br />
            <p className="mb-0 text-xs italic md:text-sm">
              {description.split('\n')[0]}
            </p>
          </>
        ) : null}
      </div>
      {isInactive ? (
        <div className="absolute bottom-1 right-4 top-1 flex -rotate-12 items-center justify-center rounded-lg border-2 border-black bg-white p-2 text-xs font-semibold text-black">
          <Trans>Bientôt disponible</Trans>
        </div>
      ) : null}
    </label>
  )
}
