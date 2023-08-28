import { ReactNode } from 'react'

type Props = {
  name: string
  label: string | ReactNode
  isInvalid?: boolean
  error?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: boolean
  required?: boolean
}

export default function CheckboxInputGroup({
  name,
  label,
  error,
  className,
  onChange,
  value,
  required = false,
  ...props
}: Props) {
  return (
    <div className={`flex flex-col ${className}`} aria-live="polite">
      <label htmlFor={name}>
        <input
          name={name}
          type="checkbox"
          className={`mr-2 text-2xl max-w-[30rem] rounded-md border-solid border-grey-200 bg-grey-100 !p-4 transition-colors focus:border-primary focus:ring-2 focus:ring-primary ${
            error ? '!border-red-200 !bg-red-50 ring-2 !ring-red-700' : ''
          }`}
          onChange={onChange}
          aria-describedby={`error-${name}`}
          checked={value}
          required={required}
          {...props}
        />

        <span className={`text-sm font-bold  ${error ? '!text-red-700' : ''}`}>
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
