import { ChangeEventHandler, ForwardedRef, forwardRef } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { twMerge } from 'tailwind-merge'

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>
  name: string
  className?: string
}

export default forwardRef(function EditableToggleField(
  { name = 'newQuestion', onChange, className }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div
      className={twMerge(
        'relative flex w-full flex-col items-center overflow-hidden rounded-xl border-2 border-gray-200 p-4 transition-colors',
        className
      )}>
      <div className="flex w-full justify-between">
        <DebounceInput
          inputRef={ref}
          onChange={onChange}
          debounceTimeout={500}
          name={name}
          type="text"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className="mr-2 w-full bg-transparent px-1 pb-1 text-base outline-none focus:!border-b-2 focus:border-primary-500"
        />
      </div>
    </div>
  )
})
