import VerticalBarChart from '@/components/charts/VerticalBarChart'
import Trans from '@/components/translation/Trans'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { SimulationRecap } from '@/types/organisations'
import CategoryChartItem from './statisticsBlocks/CategoryChartItem'

function formatSimulationRecaps(simulationRecaps: SimulationRecap[]) {
  const result = simulationRecaps.reduce(
    (acc, simulation) => {
      return {
        bilan: acc.bilan + simulation.bilan,
        transport: acc.transport + simulation?.categories?.transport,
        logement: acc.logement + simulation?.categories?.logement,
        alimentation: acc.alimentation + simulation?.categories?.alimentation,
        divers: acc.divers + simulation?.categories?.divers,
        'services sociétaux':
          acc['services sociétaux'] +
          simulation?.categories?.['services sociétaux'],
      }
    },
    {
      bilan: 0,
      transport: 0,
      logement: 0,
      alimentation: 0,
      divers: 0,
      'services sociétaux': 0,
    }
  )
  Object.keys(result).forEach((key: string) => {
    result[key as keyof typeof result] =
      result[key as keyof typeof result] / simulationRecaps.length
  })

  return result
}

export default function StatisticsBlocks({
  simulationRecaps,
}: {
  simulationRecaps: SimulationRecap[]
}) {
  if (!simulationRecaps) {
    return null
  }

  const result = formatSimulationRecaps(simulationRecaps)

  const { formattedValue, unit } = formatCarbonFootprint(result?.bilan, {
    maximumFractionDigits: 1,
  })

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-grey-100 p-8">
        <p className="text-4xl font-bold text-primary-500">
          {simulationRecaps.length}
        </p>

        <p className="text-xl">
          <Trans>Simulations terminées</Trans>
        </p>
      </div>

      <div className="rounded-lg bg-grey-100 p-8">
        <p className="text-4xl font-bold text-primary-500">
          {formattedValue}{' '}
          <span className="text-base font-normal">{unit} CO2 eq</span>
        </p>
        <p className="text-xl">
          <Trans>Empreinte moyenne</Trans>
        </p>
      </div>

      <div className="rounded-lg bg-grey-100 py-2">
        <VerticalBarChart
          className={`${simulationRecaps.length <= 0 ? 'opacity-0' : ''} mt-0`}>
          {Object.entries(result)
            .filter(([key]) => key !== 'bilan')
            .map(([key, value], index) => (
              <CategoryChartItem
                index={index}
                key={key}
                category={key}
                maxValue={result.bilan / 1000}
                value={value / 1000}
              />
            ))}
        </VerticalBarChart>
      </div>
    </div>
  )
}
