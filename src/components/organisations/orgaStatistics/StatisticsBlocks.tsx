'use client'

import Trans from '@/components/translation/trans/TransClient'
import { carboneMetric, eauMetric } from '@/constants/model/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useLocale } from '@/hooks/useLocale'
import type { ComputedResults } from '@/publicodes-state/types'
import Wave from 'react-wavify'
import ResultsSoonBanner from './statisticsBlocks/ResultsSoonBanner'

// Create a mock results object with the default carbon footprints values for each category
const mockResults = {
  carbone: {
    bilan: 8000,
    transport: 3000,
    logement: 1000,
    alimentation: 1000,
    divers: 500,
    'services sociétaux': 2000,
  },
  eau: {
    bilan: 1000,
    transport: 1000,
    logement: 1000,
    alimentation: 1000,
    divers: 1000,
  },
}

export default function StatisticsBlocks({
  simulationsCount,
  computedResults,
}: {
  simulationsCount: number
  computedResults?: ComputedResults | null
}) {
  const locale = useLocale()

  const hasLessThan3Participants = simulationsCount < 3

  const result = hasLessThan3Participants ? mockResults : computedResults

  if (!result) return null

  const { formattedValue, unit } = formatFootprint(
    (result?.carbone?.bilan) /
      simulationsCount,
    {
      metric: carboneMetric,
      maximumFractionDigits: 1,
      localize: true,
    }
  )

  const { formattedValue: formattedWaterValue, unit: waterUnit } =
    formatFootprint(
      (result?.eau?.bilan) /
        simulationsCount,
      { metric: eauMetric, localize: true }
    )

  return (
    <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-primary-100 rounded-xl p-8">
        <p className="text-primary-700 text-4xl font-bold">
          {simulationsCount?.toLocaleString(locale)}
        </p>

        <p className="text-xl">
          {simulationsCount <= 1 ? (
            <Trans>Simulation terminée</Trans>
          ) : (
            <Trans>Simulations terminées</Trans>
          )}
        </p>
      </div>

      {hasLessThan3Participants && (
        <ResultsSoonBanner
          hasLessThan3Participants={hasLessThan3Participants}
        />
      )}

      {
        // Display blocks only if simulations where fetched
        !hasLessThan3Participants && !!computedResults && (
          <>
            <div className="bg-rainbow-rotation overflow-hidden rounded-xl p-8">
              <p className="text-primary-700 text-4xl font-bold">
                {formattedValue}{' '}
                <span className="text-base font-normal">
                  {unit} CO₂e <Trans>/ an</Trans>
                </span>
              </p>

              <p className="text-xl">
                <Trans>Empreinte carbone moyenne</Trans>
              </p>
            </div>

            {result.eau.bilan > 0 && (
              <div className="bg-primary-100 relative overflow-hidden rounded-xl p-8">
                <Wave
                  fill="#5152D0"
                  className="pointer-events-none absolute right-0 bottom-0 left-0 h-full w-full rounded-b-xl"
                  options={{ speed: 0.11, points: 3 }}
                />
                <div className="relative z-10">
                  <p className="text-3xl font-bold text-white">
                    {formattedWaterValue ?? 0}{' '}
                    <span className="text-base font-normal">
                      {waterUnit} <Trans>/ jour</Trans>
                    </span>
                  </p>

                  <p className="text-xl text-white">
                    <Trans>Empreinte eau moyenne</Trans>
                  </p>
                </div>
              </div>
            )}
          </>
        )
      }
    </div>
  )
}
