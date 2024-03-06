import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import { motion } from 'framer-motion'

type Props = {
  title?: string
  icons?: string
  value: boolean
  setValue: (value: boolean) => void
  index: number
}

const buttonClassNames = {
  inactive: 'border-grey-500 bg-gray-100 text-gray-400 cursor-default',
  checked: 'border-primary-500 bg-primary-200 text-primary-500 border-2',
  unchecked: 'border-gray-300 bg-white text-primary-500 hover:bg-primary-100',
}
const checkClassNames = {
  inactive: 'border-gray-300',
  checked: 'border-primary-500',
  unchecked: 'border-gray-300',
}

const labelClassNames = {
  inactive: 'text-gray-500',
  checked: 'text-primary-700',
  unchecked: 'text-gray-700',
}

export default function MosaicBooleanInput({
  title,
  icons,
  value,
  setValue,
  index,
  ...props
}: Props) {
  const status = value ? 'checked' : 'unchecked'
  return (
    <label
      className={`relative flex cursor-pointer items-center gap-2 rounded border px-4 py-2 text-left transition-colors ${buttonClassNames[status]}`}
      htmlFor={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}>
      <input
        type="checkbox"
        className="absolute h-[1px] w-[1px] opacity-0"
        onClick={() => {
          setValue(value ? false : true)
        }}
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
      </div>
    </label>
  )
}
