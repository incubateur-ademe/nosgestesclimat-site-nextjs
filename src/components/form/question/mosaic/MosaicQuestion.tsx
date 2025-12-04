'use client'

import { questionChooseAnswer } from '@/constants/tracking/question'
import { useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Evaluation } from 'publicodes'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'
import MosaicNumberInputWithoutButtons from './mosaicQuestion/MosaicNumberInputWithoutButtons'

type Props = {
  question: DottedName
  parentMosaic: DottedName
  index: number
  firstInputId: string
  value: number | boolean | undefined | null
  setValue: (dottedName: DottedName, value: number | boolean) => void
}

export default function MosaicQuestion({
  question,
  parentMosaic,
  index,
  value,
  setValue,
  firstInputId,
}: Props) {
  const { type, parent, situationValue } = useRule(question)

  const { title, icons, description } = useRule(parent)
  const maybeIdFirstInput = { ...(index === 0 ? { id: firstInputId } : {}) }

  if (
    parentMosaic === 'transport . avion . vols annuels' ||
    parentMosaic === 'transport . avion . vols amortis'
  )
    return (
      <MosaicNumberInputWithoutButtons
        question={question}
        title={title}
        icons={icons}
        description={description}
        parentMosaic={parentMosaic}
        index={index}
        value={value as number}
        setValue={(value) => setValue(question, value)}
        situationValue={situationValue as Evaluation<number>}
        {...maybeIdFirstInput}
      />
    )

  return (
    <>
      {type === 'number' && typeof value !== 'boolean' && (
        <MosaicNumberInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          parentMosaic={parentMosaic}
          index={index}
          value={value}
          setValue={(value) => setValue(question, value)}
          situationValue={situationValue as Evaluation<number>}
          {...maybeIdFirstInput}
        />
      )}
      {type === 'boolean' && typeof value !== 'number' && (
        <MosaicBooleanInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          value={value}
          setValue={(value) => {
            setValue(question, value)
            trackEvent(
              questionChooseAnswer({
                question: parent,
                answer: value,
              })
            )
          }}
          index={index}
          {...maybeIdFirstInput}
        />
      )}
    </>
  )
}
