'use client'

import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useSortedUiCategoriesByFootprint } from '@/hooks/useSortedUiCategoriesByFootprint'
import type { Metric } from '@/publicodes-state/types'
import type { ReactElement } from 'react'
import MainSubcategory from './mainSubcategories/MainSubcategory'

interface Props {
  isLink?: boolean
}

const titles: Record<Metric, ReactElement> = {
  carbone: <Trans>Mes principaux postes d’émissions</Trans>,
  eau: <Trans>Mes principaux postes d'usage</Trans>,
}
export default function MainSubcategories({ isLink }: Props) {
  const { currentMetric } = useCurrentMetric()

  const { sortedUiCategories } = useSortedUiCategoriesByFootprint({
    metric: currentMetric,
  })

  const firstThreeSubcategories = sortedUiCategories.slice(0, 3)

  return (
    <div>
      <Title
        tag="h2"
        className="text-lg md:text-2xl"
        title={titles[currentMetric]}
      />
      <ol className="flex flex-col items-start gap-4">
        {firstThreeSubcategories.map((subcategory, index) => (
          <li className="w-full" key={subcategory}>
            <MainSubcategory
              subcategory={subcategory}
              index={index}
              isLink={isLink}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}
