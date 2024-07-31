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
    // Créer un formateur de nombre pour la locale de l'utilisateur
    const formatter = new Intl.NumberFormat(locale, {
      style: 'decimal',
      useGrouping: true, // Activer les séparateurs de milliers
      maximumFractionDigits: 2,
    })

    // Formater la valeur numérique
    return formatter.format(number)
  }

  function unformatNumber(number: string) {
    // Supprimer les séparateurs de milliers
    return Number(number.replace(/[^0-9.-]+/g, ''))
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target) return

    // Prevent the user from typing non-numeric characters
    // with a regex match
    const match = event.target.value.match(/[^0-9.-]+/g)
    if (match && event.target.value.match(/[^0-9.-]+/g)) {
      event.target.value = event.target.value.replace(match[0], '')
      return
    }

    // Format the number as the user types
    const inputValue = event.target.value
    const formattedValue = formatNumber(Number(inputValue))

    // Update the input value
    event.target.value = formattedValue
    handleValueChange(event)
  }

  return (
    <div
      className={twMerge(`flex items-center justify-start gap-1`, className)}>
      <DebounceInput
        debounceTimeout={300}
        className={`focus:ring-primary max-w-[8rem] rounded-xl border-2 border-primary-200 bg-white p-2 text-right transition-colors focus:border-primary-700 focus:ring-2 md:max-w-full`}
        inputMode="numeric"
        min={min}
        value={isMissing ? '' : formatNumber(Number(value))}
        placeholder={
          isMissing
            ? value?.toLocaleString(locale, {
                maximumFractionDigits: 1,
              }) ?? '0'
            : '0'
        }
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
