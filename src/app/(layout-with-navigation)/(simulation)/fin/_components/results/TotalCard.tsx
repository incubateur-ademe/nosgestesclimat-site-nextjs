'use client'

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'

export default function TotalCard() {
  const { numericValue } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  return (
    <Card className="w-full flex-row items-center rounded-lg bg-primaryDark p-6 text-white shadow-none md:px-10">
      <div className="flex-1">
        <p className="mb-0 text-3xl md:text-4xl">
          <strong>{formattedValue}</strong>{' '}
          <span className="text-xl md:text-2xl">{unit}</span>
        </p>

        <p className="mb-0 md:text-lg">
          <span className="text-primaryLight">de </span>CO₂-e{' '}
          <span className="text-primaryLight">chaque année</span>
        </p>

        <Link
          className="mt-8 text-sm text-white hover:text-primaryLight"
          href="https://nosgestesclimat.fr/blog/budget">
          Qu'est-ce que ça veut dire ?
        </Link>
      </div>

      <div>
        <Emoji className="text-5xl md:text-8xl">🌍</Emoji>
      </div>
    </Card>
  )
}
