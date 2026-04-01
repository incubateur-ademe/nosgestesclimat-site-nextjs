'use client'

import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { JSX, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  label?: string | JSX.Element
  labelText: string
  description?: string
  isActive: boolean
  onClick: () => void
  id?: string
  'data-testid'?: string
  isWithinGrid?: boolean
  className?: string
}

const buttonClassNames = {
  checked: 'border-primary-700 text-primary-900',
  unchecked: 'border-slate-500 hover:bg-primary-50',
}
const checkClassNames = {
  checked: 'border-primary-700 before:bg-primary-700',
  unchecked: 'border-slate-400',
}
const labelClassNames = {
  checked: 'text-primary-800',
  unchecked: 'text-slate-950',
}

export default function RadioInput({
  id,
  isActive,
  isWithinGrid,
  onClick,
  label,
  labelText,
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const { t } = useClientTranslation()

  const status = isActive ? 'checked' : 'unchecked'

  return (
    <label
      title={`${labelText} - ${isActive ? t('Option sélectionnée') : t('Sélectionner cette option')}`}
      className={twMerge(
        'has-[:focus-visible]:ring-primary-700 relative flex cursor-pointer items-center gap-2 rounded-xl border bg-white px-4 py-2 text-left transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2',
        isWithinGrid ? 'w-full' : '',
        buttonClassNames[status],
        className
      )}
      data-testid={props['data-testid']}>
      <input
        type="radio"
        tabIndex={0}
        className="sr-only"
        onClick={onClick}
        onKeyDown={onKeyDownHelper(() => onClick())}
        id={id}
        {...props}
      />
      <span
        className={`${checkClassNames[status]} relative flex h-5 w-5 items-center justify-center rounded-full border-2 text-sm before:absolute before:top-0.5 before:left-0.5 before:h-3 before:w-3 before:rounded-full before:p-1 md:h-5 md:w-5 md:text-base md:before:h-3 md:before:w-3`}
      />
      <span
        className={`text-default inline flex-1 align-middle text-sm md:text-base ${labelClassNames[status]}`}>
        {label ?? children}
      </span>
    </label>
  )
}
