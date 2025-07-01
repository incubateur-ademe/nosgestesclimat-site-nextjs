import { useClientTranslation } from '@/hooks/useClientTranslation'
import SimulationsChart from './SimulationsChart'
import SimulationsFigures from './SimulationsFigures'

type Props = {
  currentMonthSimulations: number
  allSimulationsTerminees: number
}

export default function SimulationsBlock({
  currentMonthSimulations,
  allSimulationsTerminees,
}: Props) {
  const { t } = useClientTranslation()

  return (
    <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[30%_70%]">
      <SimulationsFigures
        allSimulationsTerminees={allSimulationsTerminees}
        currentMonthSimulations={currentMonthSimulations}
      />
      <SimulationsChart
        key="chart-simulation-terminees"
        dataKey="simulations-terminées"
        elementAnalysedTitle={t('simulations terminées')}
        color="#d40d83"
        defaultChartDate="7"
        defaultChartPeriod="day"
      />
    </div>
  )
}
