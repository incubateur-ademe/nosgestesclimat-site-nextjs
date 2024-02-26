import ChoiceInput from '@/components/misc/ChoiceInput'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'

type Props = {
  answer: DottedName | null
  choice: DottedName
  setAnswer: (value: DottedName) => void
}

export default function Choice({ answer, choice, setAnswer }: Props) {
  const { title, icons } = useRule(choice)

  return (
    <ChoiceInput onClick={() => setAnswer(choice)} active={choice === answer}>
      <Emoji>{icons?.slice(0, 2)}</Emoji> {title}
    </ChoiceInput>
  )
}
