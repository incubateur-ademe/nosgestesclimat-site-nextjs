'use client'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/Trans'

interface OptionType {
  value: string
  label: string
  icon: ReactNode
}

export default function FootprintSelector() {
  const { t } = useClientTranslation()

  const options: OptionType[] = [
    { value: 'carbon', label: t('Carbone'), icon: '🌡️' },
    { value: 'water', label: t('Eau'), icon: '💧' },
  ]

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    options[0]
  )

  return (
    <div className="relative rounded-lg">
      <label htmlFor="footprint-select" className="relative block h-full">
        <p className="absolute left-2 top-2 m-0 text-[0.6rem]">
          <Trans>Empreinte</Trans>
        </p>

        <select
          id="footprint-select"
          value={selectedOption?.value}
          onChange={(e) => {
            const selected = options.find(
              (option) => option.value === e.target.value
            )
            setSelectedOption(selected || null)
          }}
          className={twMerge(
            'focus:ring-offset-3 inline-flex items-center justify-start whitespace-nowrap rounded-lg font-bold !leading-none no-underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700 aria-disabled:opacity-50',
            'pb-2 pl-2 pr-4 pt-6 text-sm sm:pr-7',
            'border-2 border-solid border-primary-700 bg-transparent text-primary-800 shadow-sm hover:border-primary-700 hover:bg-primary-100 hover:text-primary-700',
            'min-w-36 cursor-pointer appearance-none pr-8'
          )}>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="flex items-center text-sm">
              {option.label}  {option.icon}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="h-4 w-4 fill-primary-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </label>
    </div>
  )
}
