import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

export default function ColorIndicator({ question }: Props) {
  const { color } = useRule(question)

  return (
    <div
      className="absolute bottom-0 left-0 top-0 w-2"
      style={{ backgroundColor: color }}
    />
  )
}
