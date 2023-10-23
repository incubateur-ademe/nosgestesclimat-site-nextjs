'use client'

import Card from '@/design-system/layout/Card'
import { useRule } from '@/publicodes-state'
import Image from 'next/image'

export default function TotalCard() {
  const { numericValue } = useRule('bilan')

  return (
    <Card className="flex-row items-center rounded-lg bg-primaryDark p-6 text-white shadow-none">
      <div className="flex-1">
        <p className="mb-2 text-3xl">
          <strong>{(numericValue / 1000).toFixed(2)}</strong>{' '}
          <span>tonnes</span>
        </p>

        <p className="mb-0">
          <span className="text-primaryLight">de </span>CO₂-e{' '}
          <span className="text-primaryLight">chaque année</span>
        </p>
      </div>

      <div>
        <Image src="/images/misc/planete.svg" width="40" height="40" alt="" />
      </div>
    </Card>
  )
}
