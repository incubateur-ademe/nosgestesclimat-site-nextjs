'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { endClickEmpreinte } from '@/constants/tracking/pages/end'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function TotalCard() {
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  return (
    <Card className="w-full flex-row items-center rounded-xl bg-primary-700 p-6 text-white shadow-none md:px-10">
      <div className="flex-1">
        <p className="mb-0 text-3xl md:text-4xl">
          <strong>{formattedValue}</strong>{' '}
          <span className="text-xl md:text-2xl">{unit}</span>
        </p>

        <p className="mb-0 md:text-lg">
          <span className="text-primary-50">
            <Trans>de</Trans>{' '}
          </span>
          CO₂-e{' '}
          <span className="text-primary-50">
            <Trans>chaque année</Trans>
          </span>
        </p>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(
            "Qu'est-ce que ça veut dire ? Cette page s'ouvrira dans un nouvel onglet."
          )}
          className="mt-2 flex items-center text-xs text-white hover:text-primary-200 md:text-sm"
          href="/empreinte-climat"
          onClick={() => trackEvent(endClickEmpreinte)}>
          <Trans>Qu'est-ce que ça veut dire&nbsp;?&nbsp;</Trans>
          <ExternalLinkIcon className="stroke-white" />
        </Link>
      </div>

      <div>
        <Emoji className="z-10 mr-4 text-8xl">🌍</Emoji>
      </div>
    </Card>
  )
}
