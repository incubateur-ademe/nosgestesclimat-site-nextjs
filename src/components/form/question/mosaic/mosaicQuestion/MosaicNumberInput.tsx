import NumberInput from '@/components/form/question/NumberInput'
import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import Button from '@/design-system/buttons/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
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
  shouldContainButtons?: boolean
}

export default function MosaicNumberInput({
  question,
  title,
  icons,
  description,
  setValue,
  index,
  value,
  situationValue,
  parentMosaic,
  shouldContainButtons = true,
}: Props) {
  const { plafond } = useRule(question)

  const { t } = useClientTranslation()

  const isPlusDisabled = !!value && value >= plafond

  // Model shenanigans for description split...
  return (
    <div
      className={
        'focus-within:ring-primary-700 flex items-center justify-between gap-1 rounded-xl border border-slate-500 bg-white p-3 focus-within:ring-2 focus-within:ring-offset-2'
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
      {shouldContainButtons ? (
        <div className="flex items-center gap-1.5 p-2">
          <Button
            disabled={!value}
            onClick={() => setValue((value ?? 0) - 1)}
            size="sm"
            title={t(
              'simulator.mosaicNumberInput.remove',
              'Retirer un élément : {{title}}',
              {
                title,
              }
            )}
            className="z-10 h-8 w-8 items-center justify-center p-0">
            <span className="mb-[1px] block">-</span>
          </Button>
          <NumberInput
            className="focus-within:border-primary-700 focus-within:ring-primary-700 max-h-8 w-14 rounded-sm border-none text-center ring-offset-2 focus-within:ring-2 focus-visible:outline-none"
            value={situationValue}
            placeholder={'_'}
            setValue={(value) => setValue(value ?? 0)}
            data-cypress-id={`${question}---${parentMosaic}`}
            id={`${DEFAULT_FOCUS_ELEMENT_ID}-${index}`}
          />
          <Button
            disabled={isPlusDisabled}
            onClick={() => setValue((value ?? 0) + 1)}
            title={t(
              'simulator.mosaicNumberInput.add',
              'Ajouter un élément : {{title}}',
              {
                title,
              }
            )}
            size="sm"
            className="z-10 h-8 w-8 items-center justify-center p-0">
            <span className="mb-[1px] block">+</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 p-2 pr-18">
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
      )}
    </div>
  )
}
