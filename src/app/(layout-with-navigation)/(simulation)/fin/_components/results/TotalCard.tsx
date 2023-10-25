'use client'

import Card from '@/design-system/layout/Card'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'
import Image from 'next/image'

export default function TotalCard() {
  const { numericValue } = useRule('bilan')

  return (
    <Card className="w-full flex-row items-center rounded-lg bg-primaryDark p-6 text-white shadow-none">
      <div className="flex-1">
        <p className="mb-0 text-3xl">
          <strong>{formatCarbonFootprint(numericValue)?.formattedValue}</strong>{' '}
          <span className="text-xl">tonnes</span>
        </p>

        <p className="mb-0">
          <span className="text-primaryLight">de </span>CO₂-e{' '}
          <span className="text-primaryLight">chaque année</span>
        </p>
      </div>

      <div>
        <Image
          src="/images/misc/planete-terre.svg"
          width="40"
          height="40"
          alt=""
        />
      </div>
    </Card>
  )
}
