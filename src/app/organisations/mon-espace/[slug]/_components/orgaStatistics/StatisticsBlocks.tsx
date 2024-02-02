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
        transports: acc.transports + simulation?.categories?.transports,
        logement: acc.logement + simulation?.categories?.logement,
        alimentation: acc.alimentation + simulation?.categories?.alimentation,
        divers: acc.divers + simulation?.categories?.divers,
        services: acc.services + simulation?.categories?.services,
      }
    },
    {
      bilan: 0,
      transports: 0,
      logement: 0,
      alimentation: 0,
      divers: 0,
      services: 0,
    }
  )

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="rounded-lg bg-grey-100 p-8">
        <p className="text-4xl font-bold text-primary-500">
          {pollData.simulationsRecap.length}
        </p>
        <p>
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
        <p>
          <Trans>Empreinte moyenne</Trans>
        </p>
      </div>

      <div className="rounded-lg bg-grey-100">
        <VerticalBarChart
          className={pollData.simulationsRecap.length <= 0 ? 'opacity-0' : ''}>
          {Object.entries(result)
            .filter(([key]) => key === 'bilan')
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
