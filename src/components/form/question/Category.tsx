import Emoji from '@/design-system/utils/Emoji'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'

type Props = {
  category: DottedName
}

export default function Category({ category }: Props) {
  const { title, icons } = useRule(category)
  return (
    <div className="flex">
      <div
        className={twMerge(
          'mb-4 rounded-xl border-2 bg-white px-3 py-2 text-xs font-bold leading-none lg:text-sm',
          getBorderColor(category),
          getBackgroundLightColor(category),
          getTextDarkColor(category)
        )}>
        <Emoji>{icons}</Emoji> {title}
      </div>
    </div>
  )
}
