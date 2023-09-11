import Markdown from '@/design-system/utils/Markdown'
import { JSX, useState } from 'react'
import QuestionButton from './QuestionButton'

type Props = {
  label: string | JSX.Element
  description?: string
  active: boolean
  onClick: any
}

export default function ChoiceInput({
  label,
  description,
  active,
  onClick,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <button
          className={`rounded border border-primary px-4 py-2 text-right md:text-xl ${
            active ? 'bg-primary text-white' : 'bg-grey-100 text-primary'
          }`}
          onClick={onClick}>
          <span
            className={`${
              active ? 'before:border-white' : 'before:border-primary'
            } flex items-center gap-2 before:block before:h-4 before:w-4 before:rounded-full before:border-2 md:before:h-5 md:before:w-5`}>
            {label}
          </span>
        </button>
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
