import { KeyboardEvent, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  label: string | ReactNode
  value: boolean
  onChange: (value: boolean) => void
  name: string
}

export default function ToggleField({ label, value, onChange, name }: Props) {
  const [isEnabled, setIsEnabled] = useState<boolean>(value)

  const handleMouseEvent = () => {
    setIsEnabled((prev) => !prev)
    onChange(!isEnabled)
  }

  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleMouseEvent()
    }
  }

  return (
    <div
      className={twMerge(
        'relative flex w-full flex-col items-center overflow-hidden p-4 transition-colors',
        isEnabled ? 'bg-primary-100' : ''
      )}>
      <div className="flex w-full justify-between">
        <label htmlFor={name} className="cursor-pointer">
          {label}
        </label>
        <div className="relative inline-flex cursor-pointer items-center justify-between">
          <input
            id={name}
            type="checkbox"
            className="peer sr-only"
            checked={isEnabled}
            readOnly
          />

          <div
            tabIndex={0}
            role="checkbox"
            aria-checked="false"
            aria-labelledby="toggleLabel"
            aria-describedby="toggleDescription"
            onKeyDown={handleKeyboardEvent}
            onClick={handleMouseEvent}
            className="peer h-6 w-11 rounded-full bg-primary-200  after:absolute  after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-primary-300"
          />
        </div>
      </div>
    </div>
  )
}
