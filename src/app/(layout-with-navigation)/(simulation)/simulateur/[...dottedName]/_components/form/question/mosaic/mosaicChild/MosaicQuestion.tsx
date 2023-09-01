import { useRule } from '@/publicodes-state'
import MosaicBooleanInput from './mosaicQuestion/MosaicBooleanInput'
import MosaicNumberInput from './mosaicQuestion/MosaicNumberInput'

type Props = {
  question: string
  title: string
  icons: string
}

export default function MosaicQuestion({ question, title, icons }: Props) {
  const { type } = useRule(question)

  return (
    <>
      {type === 'number' && (
        <MosaicNumberInput question={question} title={title} icons={icons} />
      )}
      {type === 'boolean' && (
        <MosaicBooleanInput question={question} title={title} icons={icons} />
      )}
    </>
  )
}
