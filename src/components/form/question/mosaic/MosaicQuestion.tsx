'use client'

import { questionChooseAnswer } from '@/constants/tracking/question'
import { useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: DottedName
  parentMosaic: DottedName
  index: number
  firstInputId: string
}

export default function MosaicQuestion({
  question,
  parentMosaic,
  index,
  firstInputId,
  ...props
}: Props) {
  const { type, parent, setValue, questionsOfMosaicFromSibling } =
    useRule(question)

  const { title, icons, description } = useRule(parent)

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={(value) => {
            setValue(value < 0 ? 0 : value, {
              questionDottedName: parentMosaic,
              questionsOfMosaicFromSibling,
            })
          }}
          parentMosaic={parentMosaic}
          index={index}
          {...props}
          {...(index === 0 ? { id: firstInputId } : {})}
        />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={(value) => {
            setValue(value, {
              questionDottedName: parentMosaic,
              questionsOfMosaicFromSibling,
            })

            trackEvent(
              questionChooseAnswer({
                question: parent,
                answer: value,
              })
            )
          }}
          index={index}
          {...props}
          {...(index === 0 ? { id: firstInputId } : {})}
        />
      )}
    </>
  )
}
