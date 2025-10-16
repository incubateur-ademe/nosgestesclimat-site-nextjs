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

  // For now, it only concerns `DPE` question whose possibilities are very short, so 4 colomns is ok. However, we should have done a special question.
  const shouldUseGridTreshold = 6
  const isGrid = choices && choices.length > shouldUseGridTreshold

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
