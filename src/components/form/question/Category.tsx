import Emoji from '@/design-system/utils/Emoji'
import { getTextDarkColor } from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'

interface Props {
  question: DottedName
}

export default function Category({ question }: Props) {
  const { category } = useRule(question)
  const { icons, title } = useRule(category)
  return (
    <div className="flex">
      <div
        className={twMerge(
          'mb-1 text-xs leading-none font-bold lg:mb-2 lg:text-sm',
          getTextDarkColor(category)
        )}>
        <Emoji>{icons}</Emoji> {title}
      </div>
    </div>
  )
}
