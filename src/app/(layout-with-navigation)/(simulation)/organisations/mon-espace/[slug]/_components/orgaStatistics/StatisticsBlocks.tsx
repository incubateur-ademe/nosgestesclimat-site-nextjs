import VerticalBarChart from '@/components/charts/VerticalBarChart'
import Trans from '@/components/translation/Trans'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { PollData } from '@/types/organizations'
import CategoryChartItem from './statisticsBlocks/CategoryChartItem'

export default function StatisticsBlocks({ pollData }: { pollData: PollData }) {
  if (!pollData) {
    return null
  }

  const result = pollData.simulationsRecap.reduce(
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
      result[key as keyof typeof result] / pollData.simulationsRecap.length
  })
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="rounded-lg bg-grey-100 p-8">
        <p className="text-4xl font-bold text-primary-500">
          {pollData.simulationsRecap.length}
        </p>

        <p className="text-xl">
          <Trans>Simulations terminées</Trans>
        </p>
      </div>

      <div className="rounded-lg bg-grey-100 p-8">
        <p className="text-4xl font-bold text-primary-500">
          {
            formatCarbonFootprint(result?.bilan, { maximumFractionDigits: 1 })
              ?.formattedValue
          }
        </p>
        <p className="text-xl">
          <Trans>Empreinte moyenne</Trans>
        </p>
      </div>

      <div className="rounded-lg bg-grey-100">
        <VerticalBarChart
          className={`${
            pollData.simulationsRecap.length <= 0 ? 'opacity-0' : ''
          } mt-0`}>
          {Object.entries(result)
            .filter(([key]) => key !== 'bilan')
            .map(([key, value], index) => (
              <CategoryChartItem
                index={index}
                key={key}
                category={key}
                maxValue={result.bilan}
                value={value}
              />
            ))}
        </VerticalBarChart>
      </div>
    </div>
  )
}
