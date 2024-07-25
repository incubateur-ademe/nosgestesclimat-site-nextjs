import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'

const widthClassName = ['w-full', 'w-11/12 md:w-3/4', 'w-10/12 md:w-1/2']

type Props = {
  subcategory: DottedName
  index: number
  value?: number
  isLink?: boolean
}
export default function MainSubcategory({
  subcategory,
  index,
  value,
  isLink,
}: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { currentMetric } = useCurrentMetric()
  const { title, numericValue, category } = useRule(subcategory, currentMetric)

  const usedValue = value ?? numericValue

  const { formattedValue, unit } = formatFootprint(usedValue, {
    locale,
    t,
    metric: currentMetric,
  })

  const handleScroll = (id: string) => {
    const block = document.getElementById(id)
    block?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <button
      disabled={!isLink}
      onClick={() => handleScroll(`category-${index}-block`)}
      className={twMerge(
        'flex items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 no-underline',
        widthClassName[index],
        getBackgroundLightColor(category),
        getBorderColor(category),
        isLink ? 'cursor-pointer' : 'cursor-default'
      )}>
      <div
        className={twMerge(
          'flex items-center gap-2 leading-none',
          getTextDarkColor(category)
        )}>
        <div
          className={twMerge(
            'flex h-9 w-9  items-center justify-center rounded-full border-2 bg-white font-black leading-none',
            getBorderColor(category)
          )}>
          {index + 1}
        </div>
        <span className="flex-1 text-left">{title}</span>
      </div>
      <div
        className={twMerge(
          'whitespace-nowrap rounded-xl border-2 bg-white px-3 py-2 font-black leading-none',
          getBorderColor(category),
          getTextDarkColor(category)
        )}>
        {formattedValue} {unit}
      </div>
    </button>
  )
}
