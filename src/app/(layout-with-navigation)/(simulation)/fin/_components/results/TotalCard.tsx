'use client'

import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'

export default function TotalCard() {
  const { numericValue } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  return (
    <Card className="w-full flex-row items-center rounded-lg bg-primaryDark p-6 text-white shadow-none">
      <div className="flex-1">
        <p className="mb-0 text-3xl">
          <strong>{formattedValue}</strong>{' '}
          <span className="text-xl">{unit}</span>
        </p>

        <p className="mb-0">
          <span className="text-primaryLight">de </span>CO₂-e{' '}
          <span className="text-primaryLight">chaque année</span>
        </p>
      </div>

      <div>
        <Emoji className="text-5xl">🌍</Emoji>
      </div>
    </Card>
  )
}
