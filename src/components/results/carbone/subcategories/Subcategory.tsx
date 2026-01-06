'use client'

import Trans from '@/components/translation/trans/TransClient'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBorderLightColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'
import Actions from './subcategory/Actions'

interface Props {
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
        getBorderLightColor(category)
      )}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-2xl">
            {index + 1}. {title}
          </h3>
          <p className="mb-0 text-base">
            <span className="text-secondary-700 font-black">{percent} %</span>{' '}
            <Trans>de votre empreinte</Trans>
          </p>
        </div>
        <Emoji className="text-4xl lg:text-6xl">{icons?.slice(0, 2)}</Emoji>
      </div>
      <Actions subcategory={subcategory} />
    </div>
  )
}
