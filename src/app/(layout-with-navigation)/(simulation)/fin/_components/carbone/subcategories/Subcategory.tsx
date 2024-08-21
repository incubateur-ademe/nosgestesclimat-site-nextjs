import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'
import Actions from './subcategory/Actions'

type Props = {
  subcategory: DottedName
  index: number
}
export default function Subcategory({ subcategory, index }: Props) {
  const { numericValue: total } = useRule('bilan')

  const { title, icons, numericValue, category } = useRule(subcategory)

  const percent = Math.round((numericValue / total) * 100)
  return (
    <div
      id={`category-${index}-block`}
      className={twMerge(
        'w-full',
        getTextDarkColor(category),
        getBorderColor(category).replace('-categories', '') + '-100'
      )}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-2xl lg:text-3xl">
            {index + 1}. {title}
          </h3>
          <div className="text-xl lg:text-2xl">
            <span className="font-black text-secondary-700">{percent} %</span>{' '}
            <Trans>de votre empreinte</Trans>
          </div>
        </div>
        <Emoji className="text-4xl lg:text-6xl">{icons?.slice(0, 2)}</Emoji>
      </div>
      <Actions subcategory={subcategory} />
    </div>
  )
}
