import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
}

export default function ColorIndicator({ question }: Props) {
  const { category } = useRule(question)

  return (
    <div
      className={`absolute bottom-0 left-0 top-0 w-[6px] ${getBackgroundColor(
        category
      )}`}
    />
  )
}
