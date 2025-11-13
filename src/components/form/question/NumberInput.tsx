'use client'

import Trans from '@/components/translation/trans/TransClient'
import { useLocale } from '@/hooks/useLocale'
import { debounce } from '@/utils/debounce'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import type { NumberFormatValues } from 'react-number-format'
import { NumericFormat } from 'react-number-format'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value?: number | null
  isMissing: boolean
  setValue: (value: number | undefined) => void
  id?: string
  className?: string
}

export default function NumberInput({
  unit,
  value,
  isMissing,
  setValue,
  className,
  id,
  ...props
}: ComponentProps<typeof NumericFormat> & Props) {
  const locale = useLocale()

  const debouncedSetValue = useMemo(() => debounce(setValue, 500), [setValue])
  const handleValueChange = (values: NumberFormatValues) => {
    let { value }: { value: string | number | undefined } = values
    console.log(value)
    if (value === '') {
      value = undefined
    } else {
      value = Number(value)
    }
    debouncedSetValue(value)
  }

  return (
    <div
      className={twMerge(`flex items-center justify-start gap-1`, className)}>
      <NumericFormat
        value={isMissing ? '' : value}
        placeholder={
          isMissing && value
            ? value.toLocaleString(locale, {
                maximumFractionDigits: Number(value) < 10 ? 1 : 0,
              })
            : ''
        }
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
