'use client'

import type { Evaluation } from 'publicodes'
import { type ComponentProps } from 'react'
import type { NumericFormat } from 'react-number-format'
import RawNumberInput from '../../numberInput/RawNumberInput'

interface Props {
  unit?: string
  value?: Evaluation<number>
  setValue: (value: number | undefined) => void
}

export default function RawMosaicNumberInput({
  unit,
  value,
  setValue,
  ...props
}: ComponentProps<typeof NumericFormat> & Props) {
  return (
    <RawNumberInput
      className="focus-within:border-primary-700 focus-within:ring-primary-700 max-h-8 w-16 rounded-sm text-center ring-offset-2 focus-within:ring-2 focus-visible:outline-none"
      value={value}
      placeholder={value === null ? '' : '_'}
      unit={unit}
      handleValueChange={({ floatValue, value }) =>
        setValue(value === undefined ? value : floatValue)
      }
      {...props}
    />
  )
}
