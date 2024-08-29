import Trans from '@/components/translation/Trans'
import { forwardRef, HTMLAttributes } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { NumericFormat } from 'react-number-format'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value?: number | string
  isMissing: boolean
  setValue: (value: number | undefined) => void
  min?: number
  id?: string
  className?: string
  defaultValue?: string | number | null | undefined
}

forwardRef(function DebouncedInputWithForwardRef(
  props: React.ComponentProps<typeof DebounceInput>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return <DebounceInput type="number" {...props} inputRef={ref} />
})

export default function NumberInput({
  unit,
  value = '',
  isMissing,
  setValue,
  className,
  id,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (inputValue === '') {
      setValue(undefined)
    } else {
      setValue(unformatNumber(inputValue))
    }
  }

  function unformatNumber(number: string) {
    // Supprimer les séparateurs de milliers
    return Number(number.replace(/[^0-9.-]+/g, ''))
  }

  return (
    <div
      className={twMerge(`flex items-center justify-start gap-1`, className)}>
      <NumericFormat
        value={isMissing ? '' : value}
        placeholder={isMissing ? '0' : ''}
        className={`focus:ring-primary max-w-[8rem] rounded-xl border-2 border-primary-200 bg-white p-2 text-right transition-colors focus:border-primary-700 focus:ring-2 md:max-w-full`}
        customInput={DebounceInput}
        thousandSeparator={' '}
        allowNegative={false}
        onChange={handleValueChange}
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
