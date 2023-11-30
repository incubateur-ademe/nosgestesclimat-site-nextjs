import Trans from '@/components/translation/Trans'
import { QuestionSize } from '@/types/values'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value: number
  isMissing: boolean
  setValue: (value: number) => void
  size?: QuestionSize
  min?: number
  id?: string
  className?: string
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
  className,
  id,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  return (
    <div
      className={twMerge(
        `flex items-center justify-end gap-1 ${sizeClassNames[size]}`,
        className
      )}>
      <input
        className={`focus:ring-primary rounded border border-primary-500 bg-grey-100 p-2 text-right transition-colors focus:border-primary-500 focus:ring-2`}
        type="number"
        min={min}
        value={isMissing ? '' : value}
        placeholder={''}
        onChange={(event) => {
          setValue(Number(event.target.value))
        }}
        id={id}
        {...props}
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
