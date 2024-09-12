import { useSimulationsChart } from '@/helpers/matomo'
import { useEffect, useState } from 'react'
import Chart from './chart/Chart'

type Props = {
  dataKey: string
  elementAnalysedTitle: string
  targets?: string[]
  color: string
  defaultChartDate?: string
  defaultChartPeriod?: string
}

export default function SimulationsChart({
  dataKey,
  elementAnalysedTitle,
  color,
  defaultChartDate = '12',
  defaultChartPeriod = 'month',
}: Props) {
  const [chartDate, setChartDate] = useState(defaultChartDate)
  const [chartPeriod, setChartPeriod] = useState(defaultChartPeriod)

  const { data: chart } = useSimulationsChart({
    chartDate: Number(chartDate) + 1,
    chartPeriod,
    name: elementAnalysedTitle,
  })

  const [data, setData] = useState<
    Record<string, string | number>[] | undefined
  >(undefined)

  useEffect(() => {
    if (chart) {
      const dates = Object.keys(chart) as Array<keyof typeof chart>
      dates.length-- //last period is removed from data
      const dataDots = dates?.map((date) => {
        const points: Record<string, string | number> = {}
        points['date'] = date as string

        points[dataKey] =
          typeof chart[date] === 'number'
            ? +chart[date]
            : +chart[date]?.[0]?.['nb_visits']
        return points
      })
      setData(dataDots)
    }
  }, [chart, dataKey])

  return chart && data ? (
    <Chart
      data={data}
      dataKey={dataKey}
      elementAnalysedTitle={elementAnalysedTitle}
      chartPeriod={chartPeriod}
      chartDate={chartDate}
      setChartPeriod={setChartPeriod}
      setChartDate={setChartDate}
      color={color}
    />
  ) : null
}
