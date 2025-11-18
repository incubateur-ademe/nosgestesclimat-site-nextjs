'use client'

import Trans from '@/components/translation/trans/TransClient'
import { useDebounce } from '@/utils/debounce'
import type { Evaluation } from 'publicodes'
import { useState, type ComponentProps } from 'react'
import type { NumberFormatValues } from 'react-number-format'
import { NumericFormat } from 'react-number-format'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value?: Evaluation<number>
  placeholder?: string
  setValue: (value: number | undefined) => void
  id?: string
  className?: string
}

export default function NumberInput({
  unit,
  value,
  placeholder,
  setValue,
  className,
  id,
  ...props
}: ComponentProps<typeof NumericFormat> & Props) {
  const debouncedSetValue = useDebounce(setValue, 300)
  const handleValueChange = ({ floatValue }: NumberFormatValues) => {
    setIsPristine(false)
    debouncedSetValue(floatValue)
  }
  const [isPristine, setIsPristine] = useState(true)

  return (
    <div
      className={twMerge(`flex items-center justify-start gap-1`, className)}>
      <NumericFormat
        value={value}
        placeholder={isPristine ? placeholder : ''}
        className={twMerge(
          `max-w-[8rem] rounded-xl border border-solid border-slate-500 bg-white p-4 text-right text-sm transition-colors md:max-w-full`,
          'focus:ring-primary-700! placeholder:text-slate-500! focus:ring-2! focus:ring-offset-3! focus:outline-hidden!',
          className
        )}
        thousandSeparator={' '}
        decimalSeparator={','}
        allowNegative={false}
        autoComplete="off"
        onValueChange={handleValueChange}
        min={0}
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
