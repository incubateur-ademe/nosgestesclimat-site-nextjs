'use client'

import {
  questionChooseAnswer,
  questionTypeAnswer,
} from '@/constants/tracking/question'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
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
  const { type, parent, setValue } = useRule(question)

  const { title, icons, description } = useRule(parent)

  const { questionsOfMosaic: questionsOfParentMosaic } = useRule(parentMosaic)

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
              questionsOfParentMosaic,
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
              questionsOfParentMosaic,
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
