'use client'

import MetricSlider from '@/components/fin/MetricSlider'
import Trans from '@/components/translation/trans/TransClient'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import Separator from '@/design-system/layout/Separator'
import { useRules } from '@/hooks/useRules'
import type { Locale } from '@/i18nConfig'
import { EngineProvider, useCurrentSimulation } from '@/publicodes-state'

export default function LatestResults({ locale }: { locale: Locale }) {
  const { date } = useCurrentSimulation()

  const { data: rules, isLoading } = useRules({ isOptim: false })

  return (
    <div className="rounded-lg border-1 border-slate-200 bg-white px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-medium">
          <Trans>Derniers résultats d’empreinte</Trans>
        </h2>
        <Separator />
        <p className="mb-0 font-bold">
          <Trans>Test effectué le</Trans>{' '}
          {new Date(date)?.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      {isLoading ? (
        <BlockSkeleton />
      ) : (
        <EngineProvider rules={rules}>
          <MetricSlider isStatic isSharePage className="mb-0 h-auto" />
        </EngineProvider>
      )}
    </div>
  )
}
