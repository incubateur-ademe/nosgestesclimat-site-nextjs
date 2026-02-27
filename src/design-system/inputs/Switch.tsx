'use client'

import Link from '@/components/Link'
import { twMerge } from 'tailwind-merge'

interface Option {
  label: React.ReactNode | string
  isSelected?: boolean
}

interface LinkOption extends Option {
  href: string
}

interface ButtonOption extends Option {
  onClick: () => void
}

interface Props {
  options: LinkOption[] | ButtonOption[]
  className?: string
}

function isButtonOptions(
  options: LinkOption[] | ButtonOption[]
): options is ButtonOption[] {
  return 'onClick' in options[0]
}

const commonClassName =
  'border border-slate-300 text-default font-medium no-underline py-1 px-3'

const selectedClassName =
  'border-primary-600 text-primary-600 rounded-sm border bg-white relative'

const getFullClassName = ({
  isSelected,
  index,
  options,
}: {
  isSelected: boolean | undefined
  index: number
  options: Option[]
}) =>
  twMerge(
    commonClassName,
    'rounded-l-sm',
    index === 0 && 'border-l -mr-[1px]',
    index === options.length - 1 &&
      'border-r rounded-l-none rounded-r-sm -ml-[1px]',
    isSelected ? selectedClassName : ''
  )

export default function Switch({ options, className }: Props) {
  if (isButtonOptions(options)) {
    return (
      <div className={className}>
        {options.map(({ label, isSelected, onClick }, index) => (
          <button
            key={`switch-${index}`}
            className={getFullClassName({ isSelected, index, options })}
            onClick={onClick}>
            {label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {options.map(({ label, isSelected, href }, index) => (
        <Link
          key={`switch-${index}`}
          className={getFullClassName({ isSelected, index, options })}
          href={href}>
          {label}
        </Link>
      ))}
    </div>
  )
}
