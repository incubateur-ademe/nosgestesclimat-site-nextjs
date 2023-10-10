import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import Button from '@/design-system/inputs/Button'
import { useRule } from '@/publicodes-state'
type Props = {
  question: string
  title?: string
  icons?: string
  description?: string
  setValue: (value: number) => void
  index: number
}

export default function NumberInput({
  question,
  title,
  icons,
  description,
  setValue,
  index,
}: Props) {
  const { value, isMissing } = useRule(question)

  // Model shenanigans for description split...
  return (
    <div
      className={
        'flex items-center justify-between gap-4 rounded  bg-grey-100 px-4 py-2 md:py-4'
      }>
      <div>
        {title && icons ? (
          <span className="font-semibold md:text-xl">
            {title}&nbsp;{icons}
          </span>
        ) : null}
        {description ? (
          <>
            <br />
            <p className="mb-0 text-xs italic md:text-sm">
              {description.split('\n')[0]}
            </p>
          </>
        ) : null}
      </div>
      <div className="flex items-center">
        <Button
          disabled={value === 0}
          onClick={() => setValue(Number(value) - 1)}
          className="z-10 h-10 w-10">
          -
        </Button>
        <input
          className="bg-transparent-100  w-10 text-center"
          type="number"
          value={isMissing ? '' : Number(value)}
          placeholder={String(value)}
          onChange={(event) => setValue(Number(event.target.value))}
          id={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}
        />
        <Button
          onClick={() => setValue(Number(value) + 1)}
          className="z-10 h-10 w-10">
          +
        </Button>
      </div>
    </div>
  )
}
