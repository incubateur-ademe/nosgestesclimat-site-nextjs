import { useState } from 'react'
import QuestionButton from './QuestionButton'

type Props = {
  label: string
  description: string
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
      <div className="flex gap-2 mb-2 items-center">
        <button
          className={` rounded border border-primary px-4 py-2 text-xl ${
            active ? 'bg-primary text-white' : 'bg-grey-100 text-primary'
          }`}
          onClick={onClick}>
          <span
            className={`${
              active ? 'before:border-white' : 'before:border-primary'
            } flex items-center gap-2 before:block before:h-5 before:w-5 before:rounded-full before:border-2`}>
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
        <p className="mb-4 rounded-md bg-grey-100 p-2 w-1/2 text-sm">
          {description}
        </p>
      ) : null}
    </>
  )
}
