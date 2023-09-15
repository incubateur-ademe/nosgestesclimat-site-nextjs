import { useRule } from '@/publicodes-state'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: string
  parentMosaic: StringConstructor
}

export default function MosaicQuestion({ question, parentMosaic }: Props) {
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
        />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput
          question={question}
          title={title}
          icons={icons}
          setValue={(value) => setValue(value, parentMosaic)}
        />
      )}
    </>
  )
}
