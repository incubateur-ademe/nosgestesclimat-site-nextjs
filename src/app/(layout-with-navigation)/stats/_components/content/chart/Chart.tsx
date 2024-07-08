import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useLocale } from '@/hooks/useLocale'
import { Dispatch, SetStateAction } from 'react'
import CustomTooltip from './CustomTooltip'
import Search from './Search'

type Props = {
  data: any // oupsi
  dataKey: string
  elementAnalysedTitle: string
  chartPeriod: string
  chartDate: string
  setChartPeriod: Dispatch<SetStateAction<string>>
  setChartDate: Dispatch<SetStateAction<string>>
  color: string
}

export default function Chart({
  data,
  dataKey,
  elementAnalysedTitle,
  chartPeriod,
  chartDate,
  setChartPeriod,
  setChartDate,
  color,
}: Props) {
  const locale = useLocale()

  return (
    <div className="mt-4">
      <Search
        elementAnalysedTitle={elementAnalysedTitle}
        period={chartPeriod}
        date={chartDate}
        setPeriod={setChartPeriod}
        setDate={setChartDate}
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
                  ? date.toLocaleDateString(locale, {
                      month: 'long',
                      year: 'numeric',
                    })
                  : date.toLocaleDateString(locale, {
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
              width={70}
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
  )
}
