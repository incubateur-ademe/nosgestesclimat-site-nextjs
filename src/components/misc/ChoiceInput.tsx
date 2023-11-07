import Markdown from '@/design-system/utils/Markdown'
import { HTMLAttributes, JSX, useState } from 'react'
import QuestionButton from './QuestionButton'

type Props = {
  label: string | JSX.Element
  description?: string
  active: boolean
  onClick: any
  id?: string
  'data-cypress-id'?: string
}

export default function ChoiceInput({
  label,
  description,
  active,
  onClick,
  id,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <label
          className={`flex cursor-pointer items-center gap-2 rounded border border-gray-300 px-4 py-2 text-right md:text-xl ${
            active
              ? 'border-primary-500 bg-primary-200 text-primary-500 border-2'
              : 'text-default hover:bg-primary-100 bg-white'
          } transition-colors`}
          data-cypress-id={`${props['data-cypress-id']}-label`}>
          <input
            type="radio"
            className="hidden"
            onClick={onClick}
            id={id}
            {...props}
          />
          <span
            className={`${
              active
                ? 'border-primary-500 before:bg-primary-500'
                : 'border-gray-300 before:bg-white'
            } flex h-4 w-4 items-center justify-center rounded-full border-2 before:h-3 before:w-3 before:rounded-full  md:h-5 md:w-5`}
          />
          {label}
        </label>
        {description ? (
          <QuestionButton
            onClick={() => setIsOpen((previsOpen) => !previsOpen)}
          />
        ) : null}
      </div>
      {description && isOpen ? (
        <Markdown className="mb-4 w-1/2 rounded-md bg-grey-100 p-2 text-sm">
          {description}
        </Markdown>
      ) : null}
    </>
  )
}
