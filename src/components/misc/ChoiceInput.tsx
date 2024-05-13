import Markdown from '@/design-system/utils/Markdown'
import { HTMLAttributes, JSX, PropsWithChildren, useState } from 'react'
import QuestionButton from './QuestionButton'

type Props = {
  label?: string | JSX.Element
  description?: string
  active: boolean
  onClick: any
  id?: string
  'data-cypress-id'?: string
}

const buttonClassNames = {
  checked: 'border-primary-700 text-primary-700',
  unchecked: 'border-primary-200 hover:bg-primary-50',
}
const checkClassNames = {
  checked: 'border-primary-700 before:bg-primary-700',
  unchecked: 'border-primary-300',
}
const labelClassNames = {
  checked: 'text-primary-700',
  unchecked: 'text-gray-700',
}

export default function ChoiceInput({
  label,
  description,
  active,
  onClick,
  id,
  children,
  ...props
}: HTMLAttributes<HTMLInputElement> & PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false)

  const status = active ? 'checked' : 'unchecked'

  return (
    <>
      <div className="flex items-center gap-2">
        <label
          className={`relative flex cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-2 text-left transition-colors ${buttonClassNames[status]}`}
          data-cypress-id={`${props['data-cypress-id']}-label`}>
          <input
            type="radio"
            className="hidden"
            onClick={onClick}
            id={id}
            {...props}
          />
          <span
            className={`${checkClassNames[status]} relative flex h-5 w-5 items-center justify-center rounded-full border-2 text-sm before:absolute before:left-0.5 before:top-0.5 before:h-3 before:w-3 before:rounded-full before:p-1 md:h-5 md:w-5 md:text-base md:before:h-3 md:before:w-3`}
          />
          <span
            className={`inline flex-1 align-middle text-sm md:text-lg ${labelClassNames[status]}`}>
            {label ?? children}
          </span>
        </label>
        {description ? (
          <QuestionButton
            onClick={() => setIsOpen((previsOpen) => !previsOpen)}
          />
        ) : null}
      </div>
      {description && isOpen ? (
        <div className="mb-4 w-auto rounded-full bg-white p-2 text-sm sm:max-w-[30rem]">
          <Markdown className="!mb-0 !inline">{description}</Markdown>
        </div>
      ) : null}
    </>
  )
}
