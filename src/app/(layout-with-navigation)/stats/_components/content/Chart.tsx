import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useUser } from '@/publicodes-state/index'
import { useChart } from '../../_helpers/matomo.js'

import CustomTooltip from './chart/CustomTooltip'
import Search from './chart/Search'

type Props = {
  key: string
  dataKey: string
  elementAnalysedTitle: string
  method: string
  targets?: string[]
  color: string
  defaultChartDate?: string
  defaultChartPeriod?: string
}

export default function Chart({
  key,
  dataKey,
  elementAnalysedTitle,
  method,
  targets = [],
  color,
  defaultChartDate = '12',
  defaultChartPeriod = 'month',
}: Props) {
  const { user } = useUser()

  const [chartDate, setChartDate] = useState(defaultChartDate)
  const [chartPeriod, setChartPeriod] = useState(defaultChartPeriod)

  const { data: chart } = useChart({
    chartDate: Number(chartDate) + 1,
    chartPeriod,
    method: method,
    targets: targets,
    name: elementAnalysedTitle,
  })

  const [data, setData] = useState<
    Record<string, string | number>[] | undefined
  >(undefined)

  useEffect(() => {
    if (chart) {
      const dates = Object.keys(chart)
      dates.length-- //last period is removed from data
      const dataDots = dates?.map((date) => {
        const points: Record<string, string | number> = {}
        points['date'] = date

        points[dataKey] =
          typeof chart[date] === 'number'
            ? +chart[date]
            : +chart[date]?.[0]?.nb_visits
        return points
      })
      setData(dataDots)
    }
  }, [chart, dataKey])

  return chart && data ? (
    <div key={key} className="mt-4">
      <Search
        elementAnalysedTitle={elementAnalysedTitle}
        period={chartPeriod}
        date={chartDate}
        setPeriod={setChartPeriod}
        setDate={setChartDate}
        color={color}
      />
      <div className="h-60">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(tick) => {
                const date = new Date(tick.split(',')[0])
                return chartPeriod === 'month'
                  ? date.toLocaleDateString(user?.region?.code, {
                      month: 'long',
                      year: 'numeric',
                    })
                  : date.toLocaleDateString(user?.region?.code, {
                      day: '2-digit',
                      month: '2-digit',
                    })
              }}
              interval={'preserveStartEnd'}
              minTickGap={1}
            />
            <YAxis
              tickFormatter={(tick) =>
                tick.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
              }
            />
            <Tooltip content={<CustomTooltip period={chartPeriod} />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : null
}
