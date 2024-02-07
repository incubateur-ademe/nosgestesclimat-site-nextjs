import { PropsWithChildren } from 'react'
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  SingleValue,
} from 'react-select'

type Props = {
  options: readonly (string | number | GroupBase<string | number>)[]
  name: string
  label?: string
  error?: string
  helperText?: string
  className?: string
  onChange?: (
    newValue: MultiValue<string | number> | SingleValue<string | number>,
    actionMeta: ActionMeta<string | number>
  ) => void
  value: string | number
  required?: boolean
  isMulti?: boolean
  isClearable?: boolean
  isSearchable?: boolean
}

export default function ComplexSelect({
  options,
  name,
  label,
  error,
  helperText,
  isMulti,
  isClearable,
  isSearchable = false,
  className,
  onChange,
  value,
  required = false,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div className={`flex flex-col ${className}`} aria-live="polite">
      <label htmlFor={name}>
        <span
          className={`text-sm font-bold text-slate-900 ${
            error ? '!text-red-700' : ''
          }`}>
          {label}
        </span>
      </label>

      {helperText && (
        <span className="mt-1 text-xs text-slate-500">{helperText}</span>
      )}

      <Select
        defaultValue={value}
        options={options}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        onChange={onChange}
        aria-describedby={`select-multi-error-${name}`}
        required={required}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            padding: '0.75rem 0.5rem',
            fontSize: '0.875rem',
            borderRadius: '8px',
            cursor: 'pointer',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }),
        }}
        {...props}
      />

      {error && (
        <span
          id={`select-multi-error-${name}`}
          className="mt-2 text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  )
}
