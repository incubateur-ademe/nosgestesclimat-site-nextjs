import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import Choice from './choicesInput/Choice'

type Props = {
  question: DottedName
  value: string
  isMissing: boolean
  choices: (string | number)[] | null
  setValue: (value: string) => void
  'data-cypress-id': string
  label: string
  firstInputId?: string
}

const SHOULD_USE_GRID_THRESHOLD = 6

export default function ChoicesInput(props: Props) {
  const {
    question,
    value,
    isMissing,
    choices,
    setValue,
    label,
    firstInputId,
    ...otherProps
  } = props

  // For now, it only concerns `DPE` question whose possibilities are very short, so 4 colomns is ok. However, we should have done a special question.

  const isGrid = choices && choices.length > SHOULD_USE_GRID_THRESHOLD

  const [currentValue, setCurrentValue] = useState(value)
  return (
    <fieldset
      className={
        isGrid
          ? 'mt-2 grid grid-cols-4 gap-x-4 gap-y-2'
          : 'mt-2 flex flex-col gap-2'
      }>
      <legend className="sr-only">{label}</legend>

      {choices &&
        choices.map((choice: string | number, index: number) =>
          choice ? (
            <Choice
              key={choice}
              question={question}
              choice={choice}
              active={currentValue === choice}
              setValue={(choice: string) => {
                setCurrentValue(choice)
                requestIdleCallback(() => setValue(choice))
              }}
              {...otherProps}
              data-cypress-id={`${props['data-cypress-id']}-${choice}`}
              {...(index === 0 ? { id: firstInputId } : {})}
            />
          ) : null
        )}
    </fieldset>
  )
}
