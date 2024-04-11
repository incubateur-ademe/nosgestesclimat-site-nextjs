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
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <label
          className={`flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-right text-sm md:text-xl ${
            active
              ? 'border-2 border-primary-700 bg-primary-200 text-primary-700'
              : 'bg-white text-default hover:bg-primary-100'
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
                ? 'border-primary-700 before:bg-primary-700'
                : 'border-gray-300 before:bg-white'
            } flex h-4 w-4 items-center justify-center rounded-full border-2 text-sm before:h-3 before:w-3 before:rounded-full md:h-5 md:w-5 md:text-base`}
          />
          {label ?? children}
        </label>
        {description ? (
          <QuestionButton
            onClick={() => setIsOpen((previsOpen) => !previsOpen)}
          />
        ) : null}
      </div>
      {description && isOpen ? (
        <div className="mb-4 w-auto rounded-full bg-white p-2 text-sm sm:max-w-[30rem] sm:text-right">
          <Markdown className="!mb-0 !inline">{description}</Markdown>
        </div>
      ) : null}
    </>
  )
}
