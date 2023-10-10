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

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={(value) => setValue(value, parentMosaic)}
          index={index}
        />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput
          question={question}
          title={title}
          icons={icons}
          description={description}
          setValue={(value) => setValue(value, parentMosaic)}
          index={index}
        />
      )}
    </>
  )
}
