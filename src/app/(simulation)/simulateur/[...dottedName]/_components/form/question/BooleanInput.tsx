import ChoiceInput from '@/components/misc/ChoiceInput'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

const choices = [
  {
    value: 'non',
    label: 'Non',
  },
  {
    value: 'oui',
    label: 'Oui',
  },
]

export default function BooleanInput({ question }: Props) {
  const { value, isMissing, setValue } = useRule(question)

  return (
    <div className="align flex flex-col items-end">
      <ChoiceInput
        value="non"
        label="Non"
        active={!isMissing && !value}
        onClick={() => setValue('non')}
      />
      <ChoiceInput
        value="oui"
        label="Oui"
        active={!isMissing && value}
        onClick={() => setValue('oui')}
      />
    </div>
  )
}
