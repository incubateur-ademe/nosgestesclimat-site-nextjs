import RadioInput from '@/design-system/inputs/RadioInput'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { HTMLAttributes, JSX, PropsWithChildren } from 'react'
import { useState } from 'react'
import QuestionButton from './QuestionButton'

interface Props {
  label?: string | JSX.Element
  labelText: string
  description?: string
  active: boolean
  onClick: () => void
  id?: string
  'data-testid'?: string
  isWithinGrid?: boolean
}

export default function ChoiceInput({
  label,
  labelText,
  description,
  active,
  onClick,
  id,
  isWithinGrid,
  children,
  ...props
}: HTMLAttributes<HTMLInputElement> & PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useClientTranslation()

  return (
    <>
      <div className="flex items-center gap-2">
        <RadioInput
          id={id}
          label={label}
          labelText={labelText}
          isWithinGrid={isWithinGrid}
          isActive={active}
          data-testid={`${props['data-testid']}-label`}
          onClick={onClick}>
          {children}
        </RadioInput>
        {description ? (
          <QuestionButton
            title={t(
              'simulator.inputs.choice.questionButton.title',
              "Plus d'informations - {{label}}",
              {
                label: labelText,
              }
            )}
            onClick={() => setIsOpen((previsOpen) => !previsOpen)}
          />
        ) : null}
      </div>
      {description && isOpen ? (
        <div className="border-primary-50 mb-4 w-auto rounded-xl border-2 bg-white p-3 text-sm sm:max-w-[30rem]">
          <Markdown className="mb-0! inline!">{description}</Markdown>
        </div>
      ) : null}
    </>
  )
}
