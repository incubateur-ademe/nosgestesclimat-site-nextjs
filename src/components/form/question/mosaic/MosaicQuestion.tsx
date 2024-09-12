'use client'

import {
  questionChooseAnswer,
  questionTypeAnswer,
} from '@/constants/tracking/question'
import { useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: DottedName
  parentMosaic: DottedName
  index: number
}

export default function MosaicQuestion({
  question,
  parentMosaic,
  index,
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
              foldedStep: parentMosaic,
              questionsOfMosaicFromSibling,
            })

            trackEvent(
              questionTypeAnswer({
                question: parentMosaic,
                answer: parent,
                mosaicValue: value,
              })
            )
          }}
          parentMosaic={parentMosaic}
          index={index}
          {...props}
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
              foldedStep: parentMosaic,
            })

            trackEvent(
              questionChooseAnswer({
                question: parentMosaic,
                answer: parent,
                mosaicValue: value,
              })
            )
          }}
          index={index}
          {...props}
        />
      )}
    </>
  )
}
