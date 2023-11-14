'use client'

import Link from '@/components/Link'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'

export default function TotalCard() {
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  return (
    <Card className="w-full flex-row items-center rounded-lg bg-primary-700 p-6 text-white shadow-none md:px-10">
      <div className="flex-1">
        <p className="mb-0 text-3xl md:text-4xl">
          <strong>{formattedValue}</strong>{' '}
          <span className="text-xl md:text-2xl">{unit}</span>
        </p>

        <p className="mb-0 md:text-lg">
          <span className="text-primary-200">de </span>CO₂-e{' '}
          <span className="text-primary-200">chaque année</span>
        </p>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(
            "Qu'est-ce que ça veut dire ? Cette page s'ouvrira dans un nouvel onglet."
          )}
          className="mt-2 text-sm text-white hover:text-primary-200"
          href="https://nosgestesclimat.fr/blog/budget">
          Qu'est-ce que ça veut dire&nbsp;?&nbsp;
          <ExternalLinkIcon className="stroke-white" />
        </Link>
      </div>

      <div>
        <Emoji className="text-5xl md:text-8xl">🌍</Emoji>
      </div>
    </Card>
  )
}
