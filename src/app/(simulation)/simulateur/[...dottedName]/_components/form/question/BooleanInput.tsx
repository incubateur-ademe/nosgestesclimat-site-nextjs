import ChoiceInput from '@/components/misc/ChoiceInput'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

export default function BooleanInput({ question }: Props) {
  const { value, isMissing, setValue } = useRule(question)

  return (
    <div className="align flex flex-col items-end">
      <ChoiceInput
        label="Non"
        active={!isMissing && !value}
        onClick={() => setValue('non')}
      />
      <ChoiceInput
        label="Oui"
        active={!isMissing && value}
        onClick={() => setValue('oui')}
      />
    </div>
  )
}
