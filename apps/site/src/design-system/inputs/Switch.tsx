'use client'

import Link from '@/components/Link'
import { cn } from '@/lib/utils'
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'

interface Option {
  label: React.ReactNode | string
  'data-testid'?: string
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
  'aria-label': string
}

function isButtonOptions(
  options: LinkOption[] | ButtonOption[]
): options is ButtonOption[] {
  return options.length > 0 && 'onClick' in options[0]
}

const commonClassName =
  'border border-slate-300 text-sm font-medium no-underline py-1 px-3 flex-1'

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
  cn(
    commonClassName,
    'rounded-l-sm flex items-center',
    index === 0 && 'border-l -mr-[1px]',
    index === options.length - 1 &&
      'border-r rounded-l-none rounded-r-sm -ml-[1px]',
    isSelected ? selectedClassName : ''
  )

export default function Switch({
  options,
  className,
  'aria-label': ariaLabel,
}: Props) {
  if (isButtonOptions(options)) {
    return (
      <ToggleGroupPrimitive.Root
        type="single"
        aria-label={ariaLabel}
        className={cn('flex', className)}>
        {options.map(({ label, isSelected, onClick, ...props }, index) => (
          <ToggleGroupPrimitive.Item
            key={`switch-${index}`}
            type="button"
            value={`switch-${index}`}
            className={getFullClassName({ isSelected, index, options })}
            aria-pressed={isSelected ?? false}
            onClick={onClick}
            {...props}>
            {label}
          </ToggleGroupPrimitive.Item>
        ))}
      </ToggleGroupPrimitive.Root>
    )
  }

  return (
    <nav aria-label={ariaLabel} className={cn('flex', className)}>
      {options.map(({ label, isSelected, ...props }, index) => (
        <Link
          key={`switch-${index}`}
          className={getFullClassName({ isSelected, index, options })}
          aria-current={isSelected ? 'page' : undefined}
          {...props}>
          {label}
        </Link>
      ))}
    </nav>
  )
}
