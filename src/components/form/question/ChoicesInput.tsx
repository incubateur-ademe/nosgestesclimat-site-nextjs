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

function createGrid<T>(arr: T[], columns: number) {
  const rows = Math.ceil(arr.length / columns)
  const finalGrid: T[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const idx = c * rows + r
      if (idx < arr.length) finalGrid.push(arr[idx])
    }
  }
  return finalGrid
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

  const isGrid = choices && choices.length > 4
  const displayChoices = isGrid ? createGrid(choices, 2) : choices

  return (
    <fieldset
      className={
        isGrid
          ? 'mt-2 grid grid-cols-2 gap-x-4 gap-y-2'
          : 'mt-2 flex flex-col gap-2'
      }>
      <legend className="sr-only">{label}</legend>

      {displayChoices &&
        displayChoices.map((choice: string | number, index: number) =>
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
