import ChoiceInput from '@/components/misc/ChoiceInput'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'

type Props = {
  answer: string | null
  choice: string
  setAnswer: (value: string) => void
}

export default function Choice({ answer, choice, setAnswer }: Props) {
  const { title, icons } = useRule(choice)

  return (
    <ChoiceInput onClick={() => setAnswer(choice)} active={choice === answer}>
      <Emoji>{icons?.slice(0, 2)}</Emoji> {title}
    </ChoiceInput>
  )
}
