import Trans from '@/components/translation/Trans'
import { useLocale } from '@/hooks/useLocale'
import { HTMLAttributes } from 'react'
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
  const locale = useLocale()

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (inputValue === '') {
      setValue(undefined)
    } else {
      setValue(unformatNumber(inputValue.replace(/[^0-9.-]+/g, '')))
    }
  }

  function formatNumber(number: number) {
    return number.toLocaleString(locale, {
      maximumFractionDigits: 1,
    })
  }

  function unformatNumber(number: string) {
    // Supprimer les séparateurs de milliers
    return Number(number.replace(/[^0-9.-]+/g, ''))
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target) return

    const { value } = event.target

    // Prevent the user from typing non-numeric characters
    // with a regex match
    const match = value.match(/[^0-9.-]+/g)

    if (match) {
      event.target.value = value.replace(match[0], '')
      return
    }

    // Format the number as the user types
    const inputValue = event.target.value
    const formattedValue = formatNumber(Number(inputValue))

    // Update the input value
    event.target.value = formattedValue
    handleValueChange(event)
  }

  const formattedValue = formatNumber(Number(value))

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
