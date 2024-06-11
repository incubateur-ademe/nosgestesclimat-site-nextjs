import CheckCircleIcon from '@/components/icons/CheckCircleIcon'
import { ChangeEventHandler, HTMLAttributes, ReactNode } from 'react'
import { Controller } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type Props = {
  name: string
  label?: string | ReactNode
  type?: string
  items: { value: string; label: string }[]
  isInvalid?: boolean
  error?: string
  helperText?: string | ReactNode
  className?: string
  containerClassName?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | number
  required?: boolean
  maxLength?: number
  disabled?: boolean
  control: any
  rules?: Record<string, any>
}

export default function GridRadioInputs({
  name,
  label,
  error,
  items,
  helperText,
  containerClassName,
  value,
  control,
  rules,
}: HTMLAttributes<HTMLInputElement> & Props) {
  return (
    <div
      className={twMerge(
        'flex w-full max-w-[30rem] flex-col items-start',
        containerClassName
      )}
      aria-live="polite">
      {label ? (
        <label htmlFor={name} className="w-full">
          <span
            className={` text-sm font-bold text-slate-900 ${
              error ? '!text-red-700' : ''
            }`}>
            {label}
          </span>
        </label>
      ) : null}

      {helperText ? (
        <span className="mb-4 mt-1 text-xs text-slate-500">{helperText}</span>
      ) : null}

      <Controller
        control={control}
        name={name}
        defaultValue={value ?? ''}
        rules={rules ?? undefined}
        render={({ field: { onChange, value, ...props } }) => {
          return (
            <div className="grid w-full grid-cols-4 gap-2 sm:grid-cols-5">
              {items?.map((item) => {
                // Style the radio to look like a button
                // hiding the actual radio button
                // and adding a border and padding to the label
                // add a bg color to the selected radio based on css checked pseudo class
                return (
                  <label
                    key={item.value}
                    className={twMerge(
                      'relative flex cursor-pointer items-center justify-center rounded-xl border-2 border-gray-200 p-6 text-xl transition-colors',
                      'hover:border-gray-300 hover:bg-primary-50 focus:border-slate-300',
                      value === item.value
                        ? '!border-primary-700 !bg-primary-50'
                        : ''
                    )}>
                    {value === item.value && (
                      <CheckCircleIcon className="absolute bottom-1 right-1  fill-primary-700" />
                    )}

                    <input
                      type="radio"
                      className="sr-only"
                      onChange={(event) => {
                        console.log(event)
                        onChange(item.value)
                      }}
                      {...props}
                    />
                    {item.label}
                  </label>
                )
              })}
            </div>
          )
        }}
      />

      {error && (
        <span id={`error-${name}`} className="mt-2 text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  )
}
