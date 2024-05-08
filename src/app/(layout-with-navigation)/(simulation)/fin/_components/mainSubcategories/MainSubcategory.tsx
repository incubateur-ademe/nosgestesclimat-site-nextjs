import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'

const widthClassName = ['w-full', 'w-11/12 md:w-3/4', 'w-10/12 md:w-1/2']

type Props = {
  subcategory: DottedName
  index: number
}
export default function MainSubcategory({ subcategory, index }: Props) {
  const locale = useLocale()

  const { t } = useClientTranslation()
  const { title, numericValue, category } = useRule(subcategory)

  const { formattedValue, unit } = formatCarbonFootprint(numericValue, {
    locale,
    t,
  })

  return (
    <div
      className={twMerge(
        ' flex items-center justify-between gap-4 rounded-xl border-2 px-4 py-3',
        widthClassName[index],
        getTextDarkColor(category),
        getBackgroundLightColor(category),
        getBorderColor(category)
      )}>
      <div className="flex items-center gap-2 leading-none">
        <div
          className={twMerge(
            'flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white font-black leading-none',
            getBorderColor(category)
          )}>
          {index + 1}
        </div>
        {title}
      </div>
      <div
        className={twMerge(
          'whitespace-nowrap rounded-xl border-2 bg-white px-3 py-2 font-black leading-none',
          getBorderColor(category)
        )}>
        {formattedValue} {unit}
      </div>
    </div>
  )
}
