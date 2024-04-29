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
          className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-2 text-right text-sm md:text-xl ${
            active
              ? 'border-2 border-primary-700 bg-white'
              : 'bg-white text-default hover:bg-primary-50'
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
                ? 'border-primary-700 before:bg-primary-700 '
                : 'border-gray-300 before:bg-white'
            } relative flex h-4 w-4 items-center justify-center rounded-full border-2 text-sm before:absolute before:left-0.5 before:top-0.5 before:h-2 before:w-2 before:rounded-full before:p-1 md:h-5 md:w-5 md:text-base md:before:h-3 md:before:w-3`}
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
