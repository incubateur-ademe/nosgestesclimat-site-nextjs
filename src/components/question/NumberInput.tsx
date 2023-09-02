import { useRule } from '@/publicodes-state'
import { QuestionSize } from '@/types/values'

type Props = {
  question: string
  size?: QuestionSize
}

const sizeClassNames = {
  sm: 'text-sm',
  md: '',
}
export default function NumberInput({ question, size = 'md' }: Props) {
  const { unit, value, isMissing, setValue } = useRule(question)

  return (
    <div
      className={`flex items-center justify-end gap-1 ${sizeClassNames[size]}`}>
      <input
        className={`text-right rounded border border-primary bg-grey-100 p-2 transition-colors focus:border-primary focus:ring-2 focus:ring-primary`}
        type="number"
        value={isMissing ? '' : value}
        placeholder={value.toLocaleString('fr-fr', {
          maximumFractionDigits: 1,
        })}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      &nbsp;
      {unit}
    </div>
  )
}
