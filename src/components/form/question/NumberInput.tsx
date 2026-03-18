'use client'

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Evaluation } from 'publicodes'
import { type ComponentProps } from 'react'
import type { NumericFormat } from 'react-number-format'
import AssistanceSwitch from './numberInput/AssistanceSwtich'
import RawNumberInput from './numberInput/RawNumberInput'
import { useNumberInputState } from './numberInput/useNumberInputState'

interface Props {
  question: DottedName
  unit?: string
  value?: Evaluation<number>
  placeholder?: string
  setValue: (value: number | undefined) => void
  id?: string
  className?: string
  assistance?: DottedName
}

export default function NumberInput({
  question,
  unit: defaultUnit,
  value,
  placeholder,
  setValue,
  className,
  id,
  assistance,
  ...props
}: ComponentProps<typeof NumericFormat> & Props) {
  const {
    currentUnit,
    assistanceUnit,
    updateCurrentUnit,
    value: currentValue,
    placeholder: currentPlaceholder,
    handleValueChange,
  } = useNumberInputState({
    question,
    value,
    unit: defaultUnit,
    placeholder,
    setValue,
    assistance,
  })

  return (
    <>
      {assistance && currentUnit && defaultUnit && assistanceUnit && (
        <AssistanceSwitch
          currentUnit={currentUnit}
          defaultUnit={defaultUnit}
          assistanceUnit={assistanceUnit}
          updateCurrentUnit={updateCurrentUnit}
        />
      )}

      <RawNumberInput
        className={className}
        key={currentUnit}
        value={currentValue as Evaluation<number>}
        placeholder={currentPlaceholder}
        handleValueChange={handleValueChange}
        unit={currentUnit}
        id={id}
        {...props}
      />
    </>
  )
}
