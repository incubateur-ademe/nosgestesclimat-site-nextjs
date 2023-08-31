import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

export default function BooleanInput({ question }: Props) {
  const { value, isMissing, setValue } = useRule(question)

  return <div className="align flex flex-col items-end"></div>
}
