import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'

type Props = {
  choice: string
  isHeaviest: boolean
  isAnswerValidated: boolean
  setAnswer: (value: string) => void
}

export default function Choice({
  choice,
  isHeaviest,
  isAnswerValidated,
  setAnswer,
}: Props) {
  const { title, icons } = useRule(choice)

  return (
    <Button
      onClick={() => setAnswer(choice)}
      className={isHeaviest && isAnswerValidated ? 'bg-red-500' : ''}>
      <Emoji>{icons}</Emoji> {title}
    </Button>
  )
}
