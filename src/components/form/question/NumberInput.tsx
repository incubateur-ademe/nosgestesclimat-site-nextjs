import Trans from '@/components/translation/Trans'
import { useLocale } from '@/hooks/useLocale'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value: number
  isMissing: boolean
  setValue: (value: number) => void
  min?: number
  id?: string
  className?: string
}

export default function NumberInput({
  unit,
  value,
  isMissing,
  setValue,
  min = 0,
  className,
  id,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  const locale = useLocale()

  return (
    <div className={twMerge(`flex items-center justify-end gap-1`, className)}>
      <input
        className={`focus:ring-primary max-w-[8rem] rounded border border-primary-500 bg-grey-100 p-2 text-right transition-colors focus:border-primary-500 focus:ring-2 md:max-w-full`}
        type="number"
        min={min}
        value={isMissing ? '' : value}
        placeholder={value.toLocaleString(locale, {
          maximumFractionDigits: 1,
        })}
        onChange={(event) => {
          setValue(Number(event.target.value))
        }}
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
