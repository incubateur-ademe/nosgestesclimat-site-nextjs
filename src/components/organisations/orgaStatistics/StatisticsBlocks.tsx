'use client'

import VerticalBarChart from '@/components/charts/VerticalBarChart'
import Trans from '@/components/translation/Trans'
import { carboneMetric, eauMetric } from '@/constants/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getSimulationRecapAggregatedResult } from '@/helpers/organisations/getSimulationRecapAggregatedResult'
import { useLocale } from '@/hooks/useLocale'
import { Entries } from '@/publicodes-state/types'
import { SimulationRecap } from '@/types/organisations'
import Wave from 'react-wavify'
import CategoryChartItem from './statisticsBlocks/CategoryChartItem'
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
  simulationRecaps,
  simulationRecapsWithoutExtremes,
}: {
  simulationRecaps: SimulationRecap[]
  simulationRecapsWithoutExtremes: SimulationRecap[]
}) {
  const locale = useLocale()

  if (!simulationRecaps) {
    return null
  }

  const hasLessThan3Participants = simulationRecaps.length < 3

  const result = hasLessThan3Participants
    ? mockResults
    : getSimulationRecapAggregatedResult(simulationRecapsWithoutExtremes)

  const { formattedValue, unit } = formatFootprint(result?.carbone?.bilan, {
    metric: carboneMetric,
    maximumFractionDigits: 1,
    localize: true,
  })

  const { formattedValue: formattedWaterValue, unit: waterUnit } =
    formatFootprint(result.eau.bilan, {
      metric: eauMetric,
      localize: true,
    })

  return (
    <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-primary-100 p-8">
        <p className="text-4xl font-bold text-primary-700">
          {simulationRecaps?.length?.toLocaleString(locale) ?? 0}
        </p>

        <p className="text-xl">
          {simulationRecaps.length <= 1 ? (
            <Trans>Simulation terminée</Trans>
          ) : (
            <Trans>Simulations terminées</Trans>
          )}
        </p>
      </div>

      {hasLessThan3Participants ? (
        <ResultsSoonBanner
          hasLessThan3Participants={hasLessThan3Participants}
        />
      ) : (
        <>
          <div className="bg-rainbow-rotation overflow-hidden rounded-xl p-8">
            <p className="text-4xl font-bold text-primary-700">
              {formattedValue}{' '}
              <span className="text-base font-normal">{unit} CO₂e</span>
            </p>

            <p className="text-xl">
              <Trans>
                <strong>Empreinte carbone</strong> moyenne
              </Trans>
            </p>
          </div>

          {result.eau.bilan > 0 && (
            <div className="relative overflow-hidden rounded-xl bg-primary-100 p-8">
              <Wave
                fill="#5152D0"
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full rounded-b-xl"
                options={{
                  speed: 0.11,
                  points: 3,
                }}
              />
              <div className="relative z-10">
                <p className="text-3xl font-bold text-white">
                  {formattedWaterValue ?? 0}
                  <span className="text-base font-normal">{waterUnit}</span>
                </p>

                <p className="text-xl text-white">
                  <Trans>
                    <strong>Empreinte eau</strong> moyenne
                  </Trans>
                </p>
              </div>
            </div>
          )}

          <div className="rounded-xl bg-primary-100/40 py-4">
            <VerticalBarChart className="h-[calc(100%-48px) bg-white] mt-0 px-1">
              {(
                Object.entries(result.carbone) as Entries<typeof result.carbone>
              )
                .filter(([key]) => key !== 'bilan')
                .map(([key, value], index) => (
                  <CategoryChartItem
                    index={index}
                    key={key}
                    category={key}
                    maxValue={result.carbone.bilan / 1000}
                    value={value / 1000}
                  />
                ))}
            </VerticalBarChart>

            <h3 className="mb-4 ml-6 mt-4 text-sm">
              <Trans>Moyenne du groupe par catégorie</Trans>
            </h3>
          </div>
        </>
      )}
    </div>
  )
}
