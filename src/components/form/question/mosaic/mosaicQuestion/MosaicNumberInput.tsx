import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import Button from '@/design-system/buttons/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
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
  const { value, isMissing, plafond } = useRule(question)

  const isPlusDisabled =
    value !== undefined &&
    typeof value === 'number' &&
    plafond !== undefined &&
    typeof plafond === 'number' &&
    value === plafond

  // Model shenanigans for description split...
  return (
    <div
      className={
        'focus-within:ring-primary-700 flex items-center justify-between gap-1 rounded-xl border border-slate-500 bg-white p-2 py-3 focus-within:ring-2 focus-within:ring-offset-2'
      }>
      <div>
        {title && icons ? (
          <span className="mb-1 block text-sm font-medium md:text-base">
            {title}{' '}
            <Emoji className="inline-flex items-center leading-tight">
              {icons}
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
      <div className="flex items-center gap-1.5 p-2">
        <Button
          disabled={value === 0 || isMissing}
          onClick={() => setValue(Number(value) - 1)}
          size="sm"
          className="z-10 h-8 w-8 items-center justify-center p-0 md:h-8 md:w-8">
          <span className="mb-[1px] block">-</span>
        </Button>
        <input
          className="focus-within:border-primary-700 focus-within:ring-primary-700 w-8 rounded-sm text-center ring-offset-2 focus-within:ring-2 focus-visible:outline-none"
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
          disabled={isPlusDisabled}
          onClick={() => setValue(isMissing ? 1 : Number(value) + 1)}
          size="sm"
          className="z-10 h-8 w-8 items-center justify-center p-0 md:h-8 md:w-8">
          <span className="mb-[1px] block">+</span>
        </Button>
      </div>
    </div>
  )
}
