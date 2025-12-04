import NumberInput from '@/components/form/question/NumberInput'
import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import Emoji from '@/design-system/utils/Emoji'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
type Props = {
  question: DottedName
  title?: string
  icons?: string
  description?: string
  setValue: (value: number) => void
  index: number
  value: number | undefined | null
  situationValue?: number | undefined | null
  parentMosaic: string
}

export default function MosaicNumberInputWithoutButtons({
  question,
  title,
  icons,
  description,
  setValue,
  index,
  value,
  situationValue,
  parentMosaic,
}: Props) {
  return (
    <div
      className={
        'focus-within:ring-primary-700 flex items-center justify-between gap-1 rounded-xl border border-slate-500 bg-white p-3 pr-20 focus-within:ring-2 focus-within:ring-offset-2'
      }>
      <div>
        {title && icons ? (
          <span className="mb-1 block text-sm md:text-base">
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
        <NumberInput
          className="focus-within:border-primary-700 focus-within:ring-primary-700 max-h-8 w-16 rounded-sm text-center ring-offset-2 focus-within:ring-2 focus-visible:outline-none"
          value={situationValue}
          placeholder={'_'}
          unit="h"
          setValue={(value) => setValue(value ?? 0)}
          data-cypress-id={`${question}---${parentMosaic}`}
          id={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}
        />
      </div>
    </div>
  )
}
