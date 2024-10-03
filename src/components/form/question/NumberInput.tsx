import Trans from '@/components/translation/Trans'
import { useLocale } from '@/hooks/useLocale'
import { HTMLAttributes, SyntheticEvent, useEffect, useRef } from 'react'
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
  const locale = useLocale()

  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleValueChange = (
    values: NumberFormatValues,
    sourceInfo: {
      event?: SyntheticEvent
      source: 'event' | 'prop'
    }
  ) => {
    // If the value change because we typed something, we debounce it
    if (sourceInfo.source === 'event') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setCorrectValue(values.value)
      }, 300)
      return
    }

    // If not, we set it right away
    setCorrectValue(values.value)
  }

  useEffect(() => clearTimeout(timeoutRef.current), [])

  const setCorrectValue = (value: number | string) => {
    if (value === '') {
      setValue(undefined)
    } else {
      setValue(Number(value))
    }
  }

  return (
    <div
      className={twMerge(`flex items-center justify-start gap-1`, className)}>
      <NumericFormat
        value={isMissing ? '' : value}
        placeholder={
          value.toLocaleString(locale, {
            maximumFractionDigits: 2,
          }) ?? '0'
        }
        className={`focus:ring-primary max-w-[8rem] rounded-xl border-2 border-primary-200 bg-white p-2 text-right transition-colors focus:border-primary-700 focus:ring-2 md:max-w-full`}
        thousandSeparator={' '}
        decimalSeparator={','}
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
