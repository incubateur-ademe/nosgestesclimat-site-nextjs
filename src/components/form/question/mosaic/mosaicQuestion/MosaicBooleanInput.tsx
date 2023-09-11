import TransClient from '@/components/translation/TransClient'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
  title?: string
  icons?: string
}

const buttonClassNames = {
  inactive: 'border-grey-500 bg-gray-100 text-gray-400',
  checked: 'border-primary bg-primary text-white',
  unchecked: 'border-primary bg-grey-100 text-primary',
}
const checkClassNames = {
  inactive: 'before:border-gray-300',
  checked: 'before:border-white',
  unchecked: 'before:border-primary',
}
export default function MosaicBooleanInput({ question, title, icons }: Props) {
  const { value, setValue, isMissing, isInactive } = useRule(question)

  const status = isInactive
    ? 'inactive'
    : !isMissing && value
    ? 'checked'
    : 'unchecked'
  return (
    <button
      disabled={isInactive}
      className={`relative rounded border px-4 py-2 text-left text-xl ${buttonClassNames[status]}`}
      onClick={() => {
        setValue(!value)
      }}>
      {title && icons ? (
        <span
          className={`${checkClassNames[status]} flex items-center gap-2 before:block before:h-5 before:w-5 before:rounded-sm before:border-2`}>
          {icons} {title}
        </span>
      ) : null}
      {isInactive ? (
        <div className="absolute bottom-1 right-4 top-1 flex -rotate-12 items-center justify-center rounded border-2 border-black bg-white p-2 text-xs font-semibold text-black">
          <TransClient>Bientôt disponible</TransClient>
        </div>
      ) : null}
    </button>
  )
}
