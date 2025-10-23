'use client'

import Trans from '@/components/translation/trans/TransClient'
import Separator from '@/design-system/layout/Separator'
import type { Locale } from '@/i18nConfig'
import { useCurrentSimulation } from '@/publicodes-state'

export default function LatestResults({ locale }: { locale: Locale }) {
  const { date } = useCurrentSimulation()

  return (
    <div className="rounded-lg border-1 border-slate-200 bg-white p-6">
      <div>
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
    </div>
  )
}
