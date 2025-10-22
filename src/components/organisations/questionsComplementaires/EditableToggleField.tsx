import type { ChangeEventHandler, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { twMerge } from 'tailwind-merge'

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>
  name: string
  className?: string
  error?: string
}

export default forwardRef(function EditableToggleField(
  { name = 'newQuestion', onChange, className, error }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputId = `editable-toggle-${name}`
  const errorId = `error-${name}`

  return (
    <>
      <div
        className={twMerge(
          'focus-within:ring-primary-700 relative flex w-full flex-col items-center overflow-hidden rounded-xl border border-slate-700 p-4 transition-colors focus-within:ring-2 focus-within:ring-offset-2',
          className
        )}>
        <div className="flex w-full justify-between">
          <DebounceInput
            inputRef={ref}
            onChange={onChange}
            debounceTimeout={500}
            name={name}
            id={inputId}
            type="text"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className="focus:border-primary-700 mr-2 w-full bg-transparent px-1 pb-1 text-base outline-hidden focus:border-b-2!"
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>
      </div>
      {error && (
        <p
          id={errorId}
          className="mt-1 mb-2 text-left text-sm text-red-700"
          role="alert">
          {error}
        </p>
      )}
    </>
  )
})
