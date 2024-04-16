'use client'

import Trans from '@/components/translation/Trans'
import { trackingDownloadRavijenChart } from '@/constants/tracking/misc'
import Button from '@/design-system/inputs/Button'
import { useEngine } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { toPng } from 'html-to-image'
import CategoryChart from './ravijenChart/CategoryChart'

type Props = {
  categories: string[]
  subcategories: { [key: string]: string[] }
  squashLimitPercentage?: number
  isInverted?: boolean
  shouldAlwaysDisplayValue?: boolean
}

export default function RavijenChart({
  categories,
  subcategories,
  squashLimitPercentage,
  isInverted = false,
  shouldAlwaysDisplayValue,
}: Props) {
  const { getNumericValue } = useEngine()

  const worstFootprintCategoryValue = categories
    ?.map((category) => getNumericValue(category) ?? 0)
    ?.sort((a, b) => b - a)[0]

  if (!categories) return null

  return (
    <>
      <ul
        id="ravijen"
        className="flex h-[40rem] max-w-full items-end gap-1 bg-white py-4 md:w-[36rem] md:px-4">
        {categories.map((category) => (
          <li key={category} className="h-full flex-1">
            <CategoryChart
              category={category}
              subcategories={subcategories[category]}
              maxValue={worstFootprintCategoryValue}
              squashLimitPercentage={squashLimitPercentage}
              isInverted={isInverted}
              shouldAlwaysDisplayValue={shouldAlwaysDisplayValue}
            />
          </li>
        ))}
      </ul>
      <div className="md:px-4">
        <Button
          size="sm"
          color="secondary"
          onClick={() => {
            trackEvent(trackingDownloadRavijenChart)

            const ravijen = document.getElementById('ravijen') as HTMLElement

            toPng(ravijen).then(function (dataUrl) {
              const link = document.createElement('a')
              link.download = 'empreinte_carbone_ravijen_nosgestesclimat.png'
              link.href = dataUrl
              link.click()
              link.remove()
            })
          }}>
          <Trans>Télécharger l'image</Trans>
        </Button>
      </div>
    </>
  )
}
