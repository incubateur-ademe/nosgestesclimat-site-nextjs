'use client'

import VerticalBarChart from '@/components/charts/VerticalBarChart'
import Trans from '@/components/translation/Trans'
import { carboneMetric, eauMetric } from '@/constants/metric'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
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

function formatSimulationRecaps(simulationRecaps: SimulationRecap[]) {
  const result = simulationRecaps.reduce(
    (acc, simulation) => {
      return {
        carbone: {
          bilan:
            acc.carbone.bilan + simulation.computedResults[carboneMetric].bilan,
          transport:
            acc.carbone.transport +
            simulation.computedResults[carboneMetric].categories?.transport,
          logement:
            acc.carbone.logement +
            simulation.computedResults[carboneMetric].categories?.logement,
          alimentation:
            acc.carbone.alimentation +
            simulation.computedResults[carboneMetric].categories?.alimentation,
          divers:
            acc.carbone.divers +
            simulation.computedResults[carboneMetric].categories?.divers,
          'services sociétaux':
            acc.carbone['services sociétaux'] +
            simulation.computedResults[carboneMetric].categories?.[
              'services sociétaux'
            ],
        },
        eau: {
          bilan:
            acc.eau.bilan + (simulation.computedResults[eauMetric]?.bilan ?? 0),
          transport:
            acc.eau.transport +
            (simulation.computedResults[eauMetric]?.categories?.transport ?? 0),
          logement:
            acc.eau.logement +
            (simulation.computedResults[eauMetric]?.categories?.logement ?? 0),
          alimentation:
            acc.eau.alimentation +
            (simulation.computedResults[eauMetric]?.categories?.alimentation ??
              0),
          divers:
            acc.eau.divers +
            (simulation.computedResults[eauMetric]?.categories?.divers ?? 0),
        },
      }
    },
    {
      carbone: {
        bilan: 0,
        transport: 0,
        logement: 0,
        alimentation: 0,
        divers: 0,
        'services sociétaux': 0,
      },
      eau: {
        bilan: 0,
        transport: 0,
        logement: 0,
        alimentation: 0,
        divers: 0,
      },
    }
  )

  Object.keys(result.carbone).forEach((key) => {
    result.carbone[key as keyof typeof result.carbone] =
      result.carbone[key as keyof typeof result.carbone] /
      simulationRecaps.length
  })
  Object.keys(result.eau).forEach((key) => {
    result.eau[key as keyof typeof result.eau] =
      result.eau[key as keyof typeof result.eau] / simulationRecaps.length
  })

  return result
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
    : formatSimulationRecaps(simulationRecapsWithoutExtremes)

  const { formattedValue, unit } = formatCarbonFootprint(
    result?.carbone?.bilan,
    {
      maximumFractionDigits: 1,
    }
  )

  const { formattedValue: formattedWaterValue, unit: waterUnit } =
    formatFootprint(result.eau.bilan, {
      metric: eauMetric,
      localize: false,
    })

  return (
    <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-gray-100 p-8">
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
          <div className="bg-rainbow-rotation overflow-hidden rounded-xl bg-gray-100 p-8">
            <p className="text-4xl font-bold text-primary-700">
              {formattedValue}{' '}
              <span className="text-base font-normal">{unit} CO2 eq</span>
            </p>

            <p className="text-xl">
              <Trans>Empreinte moyenne</Trans>
            </p>
          </div>

          {result.eau.bilan > 0 && (
            <div className="relative overflow-hidden rounded-xl bg-gray-100 p-8">
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
                  {parseInt(formattedWaterValue ?? 0).toLocaleString(locale, {
                    maximumFractionDigits: 1,
                  })}{' '}
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

          <div className="rounded-xl bg-gray-100 py-4">
            <VerticalBarChart className="mt-0 h-[calc(100%-48px)]">
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
