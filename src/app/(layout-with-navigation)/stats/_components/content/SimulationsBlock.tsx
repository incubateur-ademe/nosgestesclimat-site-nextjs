import { useClientTranslation } from '@/hooks/useClientTranslation'
import Chart from './Chart'
import Figures from './Figures'

type Props = {
  allTime: number
  simulations: Record<string, any>
}

export default function SimulationsBlock({ allTime, simulations }: Props) {
  const { t } = useClientTranslation()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Figures allTime={allTime} simulations={simulations} />
      <Chart
        key="chart-simulation-terminees"
        dataKey="simulations-terminées"
        elementAnalysedTitle={t('simulations terminées')}
        method="Events.getAction"
        targets={['A terminé la simulation', 'Simulation Completed']}
        color="#d40d83"
        defaultChartDate="7"
        defaultChartPeriod="day"
      />
    </div>
  )
}
