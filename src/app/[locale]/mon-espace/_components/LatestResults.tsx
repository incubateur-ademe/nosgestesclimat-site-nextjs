'use client'

import Trans from '@/components/translation/trans/TransClient'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import Separator from '@/design-system/layout/Separator'
import { fetchUserSimulations } from '@/helpers/user/fetchUserSimulations'
import type { Locale } from '@/i18nConfig'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useQuery } from '@tanstack/react-query'
import ResultsBanner from './latestResults/ResultsBanner'

export default function LatestResults({ locale }: { locale: Locale }) {
  const {
    user: { userId },
  } = useUser()

  const currentSimulation = useCurrentSimulation()

  const { data: simulations, isLoading } = useQuery({
    queryKey: ['simulations', userId],
    queryFn: () => fetchUserSimulations({ userId }),
    enabled: !!userId && !currentSimulation,
  })

  const latestSimulation = currentSimulation || simulations?.[0]

  if (isLoading || !latestSimulation) {
    return <BlockSkeleton />
  }

  return (
    <div className="border-primary-200 rounded-lg border-1 bg-white px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-medium">
          <Trans>Derniers résultats d’empreinte</Trans>
        </h2>

        <Separator />

        {latestSimulation && (
          <p className="mb-0 font-bold">
            <Trans>Test effectué le</Trans>{' '}
            {new Date(latestSimulation?.date)?.toLocaleDateString(locale, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </div>

      <ResultsBanner />
    </div>
  )
}
