import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
type Props = {
  question: DottedName
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
  ...props
}: Props) {
  const { value, isMissing } = useRule(question)

  // Model shenanigans for description split...
  return (
    <div
      className={
        'flex items-center justify-between gap-4 rounded-xl border-2 border-primary-200 bg-white p-2 py-3'
      }>
      <div>
        {title && icons ? (
          <span className="mb-1 block text-sm font-medium md:text-xl">
            <Emoji className="inline-flex items-center leading-tight">
              {title}&nbsp;{icons}
            </Emoji>
          </span>
        ) : null}
        {description ? (
          <>
            <p className="mb-0 text-xs italic md:text-xs">
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
          className="z-10 h-8 w-8 items-center justify-center p-0  md:h-8 md:w-8">
          <span className="mb-[1px] block">-</span>
        </Button>
        <input
          className="w-8 text-center"
          type="number"
          inputMode="numeric"
          value={isMissing ? '' : Number(value)}
          placeholder={'0'}
          onChange={(event) => setValue(Number(event.target.value))}
          data-cypress-id={`${question}---${parentMosaic}`}
          id={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}
          {...props}
        />
        <Button
          onClick={() => setValue(isMissing ? 1 : Number(value) + 1)}
          size="sm"
          className="z-10 h-8 w-8 items-center justify-center p-0 md:h-8 md:w-8">
          <span className="mb-[1px] block">+</span>
        </Button>
      </div>
    </div>
  )
}
