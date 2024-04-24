import { ChangeEvent, ReactNode } from 'react'

type Props = {
  name: string
  label: string | ReactNode
  isInvalid?: boolean
  error?: string
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: boolean
  defaultChecked?: boolean
  required?: boolean
  size?: 'sm' | 'lg'
}

const sizesClassNames = {
  sm: '',
  lg: 'w-8 h-8',
}

export default function CheckboxInputGroup({
  name,
  label,
  error,
  className,
  onChange,
  value,
  defaultChecked,
  required = false,
  size = 'sm',
  ...props
}: Props) {
  return (
    <div className={`flex flex-col ${className}`} aria-live="polite">
      <label htmlFor={name} className="flex cursor-pointer items-center gap-2">
        <input
          name={name}
          id={name}
          type="checkbox"
          className={`mr-2 max-w-[30rem] cursor-pointer rounded-xl border-2 border-solid border-gray-200 bg-gray-100 !p-4 text-2xl transition-colors focus:border-primary-700 focus:ring-2 focus:ring-primary-700 ${
            sizesClassNames[size]
          } ${error ? '!border-red-200 !bg-red-50 ring-2 !ring-red-700' : ''}`}
          onChange={onChange}
          aria-describedby={`error-${name}`}
          checked={value}
          defaultChecked={defaultChecked}
          required={required}
          {...props}
        />

        <span className={`text-sm ${error ? '!text-red-700' : ''}`}>
          {label}
        </span>
      </label>

      {error && (
        <span id={`error-${name}`} className="mt-2 text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  )
}
