import Emoji from '@/design-system/utils/Emoji'
import { getTextDarkColor } from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'

type Props = {
  question: DottedName
}

export default function Category({ question }: Props) {
  const { category } = useRule(question)
  const { icons, title } = useRule(category)
  return (
    <div className="flex">
      <div
        className={twMerge(
          'mb-2 text-xs font-bold leading-none lg:text-sm',
          getTextDarkColor(category)
        )}>
        <Emoji>{icons}</Emoji> {title}
      </div>
    </div>
  )
}
