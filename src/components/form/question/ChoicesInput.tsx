import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
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
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="sr-only">{label}</legend>

      {choices &&
        choices.map((choice: any, index: number) =>
          choice ? (
            <Choice
              key={choice}
              question={question}
              choice={choice}
              active={!isMissing && value === choice}
              setValue={setValue}
              {...otherProps}
              data-cypress-id={`${props['data-cypress-id']}-${choice}`}
              {...(index === 0 ? { id: firstInputId } : {})}
            />
          ) : null
        )}
    </fieldset>
  )
}
