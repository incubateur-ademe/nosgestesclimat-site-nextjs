'use client'

import type { Evaluation } from 'publicodes'
import { type ComponentProps } from 'react'
import type { NumericFormat } from 'react-number-format'
import AssistanceSwitch from './numberInput/AssistanceSwitch'
import RawNumberInput from './numberInput/RawNumberInput'
import {
  type NumberInputStateProps,
  useNumberInputState,
} from './numberInput/useNumberInputState'

interface Props extends NumberInputStateProps {
  id?: string
  className?: string
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
