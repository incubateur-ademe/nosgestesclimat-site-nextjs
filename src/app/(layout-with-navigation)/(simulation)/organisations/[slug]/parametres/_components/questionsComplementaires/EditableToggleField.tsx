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
          className="mr-2 w-full border-primary-700 bg-transparent px-1 pb-1 text-base outline-none focus:!border-b-2"
        />

        <div className="relative inline-flex items-center justify-between">
          <div className="peer h-6 w-11 rounded-full bg-primary-200  after:absolute  after:left-[2px] after:top-[5px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-primary-300" />
        </div>
      </div>
    </div>
  )
})
