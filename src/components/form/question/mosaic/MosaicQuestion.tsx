import { useRule } from '@/publicodes-state'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: string
  parentMosaic: string
  index: number
}

export default function MosaicQuestion({
  question,
  parentMosaic,
  index,
}: Props) {
  const { type, parent, setValue } = useRule(question)

  const { title, icons, description } = useRule(parent)

  const { resetMosaicChildren } = useRule(parentMosaic)

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={async (value) => {
            const limit = 0
            await setValue(value < limit ? limit : value, parentMosaic)
            resetMosaicChildren(question)
          }}
          parentMosaic={parentMosaic}
          index={index}
        />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={async (value) => {
            await setValue(value, parentMosaic)
            resetMosaicChildren(question)
          }}
          index={index}
        />
      )}
    </>
  )
}
