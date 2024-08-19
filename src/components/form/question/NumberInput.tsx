'use client'

import Trans from '@/components/translation/Trans'
import { useLocale } from '@/hooks/useLocale'
import { HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value?: number | string
  isMissing: boolean
  setValue: (value: number | undefined) => void
  min?: number
  id?: string
  className?: string
}

export default function NumberInput({
  unit,
  value = '',
  isMissing,
  setValue,
  min = 0,
  className,
  id,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  const [formattedValue, setFormattedValue] = useState('')

  const locale = useLocale()

  const formatNumberWithSpaces = useCallback(
    (number: number) => {
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(number)
    },
    [locale]
  )

  const unformatNumber = (formattedNumber: string) => {
    return Number(formattedNumber.replace(/\s+/g, '').replace(/,/g, '.'))
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (inputValue === '') {
      setValue(undefined)
    } else {
      setValue(unformatNumber(inputValue.replace(/[^0-9.-]+/g, '')))
    }
  }

  useEffect(() => {
    setFormattedValue(
      formatNumberWithSpaces(Number(`${value}`.replace(/\s+/g, '')))
    )
  }, [value, formatNumberWithSpaces])

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value

    if (inputValue === '') {
      setValue(undefined)
    } else {
      setValue(unformatNumber(inputValue))
    }
  }

  return (
    <div
      className={twMerge(`flex items-center justify-start gap-1`, className)}>
      <DebounceInput
        debounceTimeout={300}
        className={`focus:ring-primary max-w-[8rem] rounded-xl border-2 border-primary-200 bg-white p-2 text-right transition-colors focus:border-primary-700 focus:ring-2 md:max-w-full`}
        inputMode="numeric"
        min={min}
        value={isMissing ? '' : formattedValue}
        placeholder={isMissing ? formattedValue ?? '0' : '0'}
        onChange={handleValueChange}
        onInput={handleInput}
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
