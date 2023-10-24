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
          className={`flex cursor-pointer items-center gap-2 rounded border border-primary px-4 py-2 text-right md:text-xl ${
            active
              ? 'bg-primary text-white'
              : 'bg-grey-100 text-primary hover:bg-primaryLight'
          } transition-colors`}
          data-cypress-id={`${props['data-cypress-id']}-label`}
        >
          <input
            type="radio"
            className="hidden"
            onClick={onClick}
            id={id}
            {...props}
          />
          <span
            className={`${
              active ? 'border-white' : 'border-primary'
            } flex h-4 w-4 items-center justify-center rounded-full border-2 before:h-3 before:w-3 before:rounded-full before:bg-white md:h-5 md:w-5`}
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
