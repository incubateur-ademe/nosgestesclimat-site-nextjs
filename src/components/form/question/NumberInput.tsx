import Trans from '@/components/translation/Trans'
import { useLocale } from '@/hooks/useLocale'
import { QuestionSize } from '@/types/values'

type Props = {
  unit?: string
  value: number
  isMissing: boolean
  setValue: (value: number) => void
  size?: QuestionSize
  min?: number
  id?: string
}

const sizeClassNames = {
  sm: 'text-sm',
  md: '',
}
export default function NumberInput({
  unit,
  value,
  isMissing,
  setValue,
  size = 'md',
  min = 0,
  id,
}: Props) {
  const locale = useLocale()
  return (
    <div
      className={`flex items-center justify-end gap-1 ${sizeClassNames[size]}`}>
      <input
        className={`rounded border border-primary bg-grey-100 p-2 text-right transition-colors focus:border-primary focus:ring-2 focus:ring-primary`}
        type="number"
        min={min}
        value={isMissing ? '' : value}
        placeholder={value.toLocaleString(locale, {
          maximumFractionDigits: 1,
        })}
        onChange={(event) => {
          setValue(Number(event.target.value))
        }}
        id={id}
      />
      {unit ? (
        <>
          &nbsp;
          <Trans>{unit}</Trans>
        </>
      ) : null}
    </div>
  )
}
