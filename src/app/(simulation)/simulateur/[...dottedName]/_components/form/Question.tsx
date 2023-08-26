import { useRule } from '@/publicodes-state'
import ChoicesInput from './question/ChoicesInput'
import Label from './question/Label'
import Mosaic from './question/Mosaic'
import NumberInput from './question/NumberInput'
import Suggestions from './question/Suggestions'

type Props = {
  question: string
}

export default function Question({ question }: Props) {
  const { type, setValue } = useRule(question)

  return (
    <div className="mb-4">
      <Label question={question} />
      <Suggestions question={question} setValue={setValue} />
      {type === 'number' && (
        <NumberInput question={question} setValue={setValue} />
      )}
      {type === 'choices' && (
        <ChoicesInput question={question} setValue={setValue} />
      )}
      {type === 'mosaic' && <Mosaic question={question} setValue={setValue} />}
    </div>
  )
}
