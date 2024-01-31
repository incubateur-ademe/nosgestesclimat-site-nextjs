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
  parentMosaic: string
}

export default function NumberInput({
  question,
  title,
  icons,
  description,
  setValue,
  index,
  parentMosaic,
}: Props) {
  const { value, isMissing } = useRule(question)

  // Model shenanigans for description split...
  return (
    <div
      className={
        'flex items-center justify-between gap-4 rounded  bg-white px-2 py-2 md:py-4'
      }>
      <div>
        {title && icons ? (
          <span className="text-sm font-semibold md:text-xl">
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
          disabled={value === 0 || isMissing}
          onClick={() => setValue(Number(value) - 1)}
          size="sm"
          className="z-10 h-8 w-8 items-center justify-center  md:h-10 md:w-10">
          -
        </Button>
        <input
          className="bg-transparent-100  w-10 text-center"
          type="number"
          value={isMissing ? '' : Number(value)}
          placeholder={'0'}
          onChange={(event) => {
            // The value should always be positive
            setValue(
              Number(event.target.value) > 0 ? Number(event.target.value) : 0
            )
          }}
          data-cypress-id={`${question}---${parentMosaic}`}
          id={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}
        />
        <Button
          onClick={() => setValue(isMissing ? 1 : Number(value) + 1)}
          className="z-10 h-8 w-8 items-center justify-center  md:h-10 md:w-10">
          +
        </Button>
      </div>
    </div>
  )
}
