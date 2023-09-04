import { useRule } from '@/publicodes-state'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: string
}

export default function MosaicQuestion({ question }: Props) {
  const { type, parent } = useRule(question)

  const { title, icons, description } = useRule(parent)

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput
          question={question}
          title={title}
          icons={icons}
          description={description}
        />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput question={question} title={title} icons={icons} />
      )}
    </>
  )
}
