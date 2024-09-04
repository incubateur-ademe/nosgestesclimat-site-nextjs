import Trans from '@/components/translation/Trans'
import { debounce } from '@/utils/debounce'
import { HTMLAttributes } from 'react'
import { NumberFormatValues, NumericFormat } from 'react-number-format'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value?: number | string
  isMissing: boolean
  setValue: (value: number | undefined) => void
  min?: number
  id?: string
  className?: string
  defaultValue?: string | number | null | undefined
}

export default function NumberInput({
  unit,
  value = '',
  isMissing,
  setValue,
  className,
  id,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  const handleValueChange = debounce((values: NumberFormatValues) => {
    if (values.value === '') {
      setValue(undefined)
    } else {
      setValue(Number(values.value))
    }
  }, 300)

  return (
    <div
      className={twMerge(`flex items-center justify-start gap-1`, className)}>
      <NumericFormat
        value={isMissing ? '' : value}
        placeholder={isMissing ? '0' : ''}
        className={`focus:ring-primary max-w-[8rem] rounded-xl border-2 border-primary-200 bg-white p-2 text-right transition-colors focus:border-primary-700 focus:ring-2 md:max-w-full`}
        thousandSeparator={' '}
        allowNegative={false}
        onValueChange={handleValueChange}
        id={id}
        {...props}
      />

      {unit ? (
        <span className="whitespace-nowrap">
          &nbsp;
          <Trans>{unit}</Trans>
        </span>
      ) : null}
    </div>
  )
}
