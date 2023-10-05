import { QuestionSize } from '@/types/values'
import { HTMLAttributes } from 'react'

type Props = {
  unit?: string
  value: number
  isMissing: boolean
  setValue: (value: number) => void
  size?: QuestionSize
  min?: number
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
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  return (
    <div
      className={`flex items-center justify-end gap-1 ${sizeClassNames[size]}`}>
      <input
        className={`rounded border border-primary bg-grey-100 p-2 text-right transition-colors focus:border-primary focus:ring-2 focus:ring-primary`}
        type="number"
        min={min}
        value={isMissing ? '' : value}
        placeholder={value.toLocaleString('fr-fr', {
          maximumFractionDigits: 1,
        })}
        onChange={(event) => {
          setValue(Number(event.target.value))
        }}
        {...props}
      />
      {unit ? (
        <>
          &nbsp;
          {unit}
        </>
      ) : null}
    </div>
  )
}
