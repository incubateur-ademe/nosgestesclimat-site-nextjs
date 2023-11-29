'use client'

import { getBackgroundColor } from '@/helpers/getCategoryColorClass'

type Props = { category: string; percentageSquashed: number }

export default function EnigmaticMoreChartBlock({
  category,
  percentageSquashed,
}: Props) {
  return (
    <div
      title={`Autres, ${percentageSquashed.toFixed(
        1
      )}% du total de la catégorie`}
      style={{ height: `${percentageSquashed}%` }}
      className={`relative cursor-default font-bold text-white ${getBackgroundColor(
        category
      )}`}>
      <div className="absolute left-1/2 top-1/2 h-8 -translate-x-1/2 -translate-y-1/2 transform">
        ...
      </div>
    </div>
  )
}
