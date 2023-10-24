import { useRule } from '@/publicodes-state'
import { NodeValue } from '@/publicodes-state/types'

type Props = {
  value: NodeValue
  question: string
}
export default function ChoicesValue({ value, question }: Props) {
  const { title, icons } = useRule(question + ' . ' + value)

  return (
    <>
      {icons} {title}
    </>
  )
}
