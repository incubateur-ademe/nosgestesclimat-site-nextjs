'use client'

import type { Evaluation } from 'publicodes'
import { type ComponentProps } from 'react'
import type { NumericFormat } from 'react-number-format'
import RawNumberInput from '../../numberInput/RawNumberInput'

type Props = {
  unit?: string
  value?: Evaluation<number>
  placeholder?: string
  setValue: (value: number | undefined) => void
}

export default function RawMosaicNumberInput({
  unit,
  value,
  placeholder,
  setValue,
  ...props
}: ComponentProps<typeof NumericFormat> & Props) {
  return (
    <RawNumberInput
      className="focus-within:border-primary-700 focus-within:ring-primary-700 max-h-8 w-16 rounded-sm text-center ring-offset-2 focus-within:ring-2 focus-visible:outline-none"
      value={value}
      placeholder={'_'}
      unit={unit}
      handleValueChange={(value) => setValue(value.floatValue)}
      {...props}
    />
  )
}
