'use client'

import Trans from '@/components/translation/trans/TransClient'
import { useDebounce } from '@/utils/debounce'
import type { Evaluation } from 'publicodes'
import { useEffect, useState, type ComponentProps } from 'react'
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
  const defaultValue: Partial<NumberFormatValues> = {
    value: undefined,
    floatValue: value ?? undefined,
  }
  const [currentValues, setCurrentValues] = useState(defaultValue)

  const handleValueChange = (values: NumberFormatValues) => {
    setCurrentValues(values)
    debouncedSetValue(values.floatValue)
  }

  // La valeur peut être mise à jour depuis l'exterieur (via les boutons de suggestion par exemple)
  // Quand ça arrive, la valeur de `value` et `currentValues` sont désynchronisées.
  // Pour reset le champs avec la valeur passée en prop, on reset `currentValues.value` a undefined.
  useEffect(() => {
    if (value !== null && value !== 0 && value != currentValues.floatValue) {
      setCurrentValues(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div
      className={twMerge(`flex items-center justify-start gap-1`, className)}>
      <NumericFormat
        value={currentValues.value ?? currentValues.floatValue}
        placeholder={currentValues.value === undefined ? placeholder : ''}
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
