import { useClientTranslation } from '@/hooks/useClientTranslation'
import VisitsChart from './VisitsChart'
import VisitsFigures from './VisitsFigures'

type Props = {
  allTimeVisits: number
  currentMonthVisits: number
}

export default function VisitsBlock({
  allTimeVisits,
  currentMonthVisits,
}: Props) {
  const { t } = useClientTranslation()

  return (
    <div className="mb-8 grid grid-cols-1 items-center gap-4 lg:grid-cols-[30%_70%]">
      <VisitsFigures
        allTimeVisits={allTimeVisits}
        currentMonthVisits={currentMonthVisits}
      />
      <VisitsChart
        key="chart-visites"
        dataKey="chart-visites"
        elementAnalysedTitle={t('visites')}
        color="#4949ba"
      />
    </div>
  )
}
