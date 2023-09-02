import Assistance from '@/components/question/Assistance'
import BooleanInput from '@/components/question/BooleanInput'
import ChoicesInput from '@/components/question/ChoicesInput'
import Label from '@/components/question/Label'
import Mosaic from '@/components/question/Mosaic'
import NumberInput from '@/components/question/NumberInput'
import Suggestions from '@/components/question/Suggestions'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

export default function Question({ question }: Props) {
  const { type, assistance } = useRule(question)

  return (
    <>
      <div className="mb-4">
        <Label question={question} />
        <Suggestions question={question} />
        {type === 'number' && <NumberInput question={question} />}
        {type === 'boolean' && <BooleanInput question={question} />}
        {type === 'choices' && <ChoicesInput question={question} />}
        {type === 'mosaic' && <Mosaic question={question} />}
      </div>{' '}
      {assistance ? (
        <Assistance question={question} assistance={assistance} />
      ) : null}
    </>
  )
}
