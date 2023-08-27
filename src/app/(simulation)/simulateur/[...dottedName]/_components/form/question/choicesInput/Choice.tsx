import ChoiceInput from '@/components/misc/ChoiceInput'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
  choice: string
  active: boolean
  setValue: any
}

export default function Choice({ question, choice, active, setValue }: Props) {
  const { title, label, description, icons } = useRule(
    question + ' . ' + choice
  )

  return (
    <ChoiceInput
      label={`${title} ${icons || ''} `}
      description={description}
      active={active}
      onClick={() => setValue(choice)}
    />
  )
}
