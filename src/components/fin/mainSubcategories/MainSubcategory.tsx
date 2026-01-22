import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import {
  getBackgroundLightColor,
  getBorderColor,
  getBorderDarkColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'

const widthClassName = ['w-full', 'w-11/12 md:w-3/4', 'w-10/12 md:w-1/2']

interface Props {
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
        'focus:ring-primary-700 flex items-center justify-between gap-4 rounded-xl border px-4 py-3 no-underline focus:ring-2 focus:ring-offset-3 focus:outline-hidden',
        widthClassName[index],
        getBackgroundLightColor(category),
        getBorderDarkColor(category),
        isLink ? 'cursor-pointer' : 'cursor-default'
      )}
      aria-label={
        isLink
          ? t(
              'results.mainSubcategories.mainSubcategory.seeDetail',
              '{{title}}, voir le détail ci-dessous',
              { title }
            )
          : ''
      }>
      <div
        className={twMerge(
          'flex items-center gap-2 leading-none',
          getTextDarkColor(category)
        )}>
        <div
          className={twMerge(
            'flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white leading-none font-black',
            getBorderColor(category)
          )}>
          {index + 1}
        </div>
        <span className="flex-1 text-left">{title}</span>
      </div>
      <div
        className={twMerge(
          'rounded-xl border-2 bg-white px-3 py-2 leading-none font-black whitespace-nowrap',
          getBorderColor(category),
          getTextDarkColor(category)
        )}>
        {formattedValue} {unit}
      </div>
    </button>
  )
}
