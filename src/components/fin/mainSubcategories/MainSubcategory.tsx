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
  const { title, numericValue, category } = useRule(subcategory)

  const usedValue = value ?? numericValue

  const { formattedValue, unit } = formatCarbonFootprint(usedValue, {
    locale,
    t,
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
          getBorderColor(category),
          getTextDarkColor(category)
        )}>
        {formattedValue} {unit}
      </div>
    </button>
  )
}
