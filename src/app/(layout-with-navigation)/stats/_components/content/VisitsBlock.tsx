import { useClientTranslation } from '@/hooks/useClientTranslation'
import Chart from './Chart'
import Figures from './Figures'

type Props = {
  allTime: number
  simulations: Record<string, any>
}

export default function VisitsBlock({ allTime, simulations }: Props) {
  const { t } = useClientTranslation()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Figures allTime={allTime} simulations={simulations} />
      <Chart
        key="chart-visites"
        dataKey="chart-visites"
        elementAnalysedTitle={t('visites')}
        method="VisitsSummary.getVisits"
        color="#4949ba"
      />
    </div>
  )
}
