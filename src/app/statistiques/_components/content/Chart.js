import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { getLangFromAbreviation, getLangInfos } from '@/locales/translation'

import { useClientTranslation } from '@/hooks/useClientTranslation.js'
import { useChart } from '../../_helpers/matomo.js'
import CustomTooltip from './chart/CustomTooltip.js'
import Search from './chart/Search.js'

export default function Chart() {
  const { i18n } = useClientTranslation()
  const currentLangInfos = getLangInfos(getLangFromAbreviation(i18n.language))

  const [chartDate, setChartDate] = useState('12')
  const [chartPeriod, setChartPeriod] = useState('week')

  const { data: chart } = useChart({
    chartDate: Number(chartDate) + 1,
    chartPeriod,
    target: props.target,
    name: props.elementAnalysedTitle,
  })

  const [data, setData] = useState(undefined)

  useEffect(() => {
    if (chart) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const dates = Object.keys(chart)
      dates.length-- //last period is removed from data
      const dataDots = dates?.map((date) => {
        const points = { date }

        points['Visiteurs'] =
          typeof chart[date] === 'number'
            ? chart[date]
            : chart[date]?.[0]?.nb_visits
        return points
      })
      setData(dataDots)
    }
  }, [chart])

  return chart && data ? (
    <div className="w-full lg:w-1/2">
      <Search
        elementAnalysedTitle={props.elementAnalysedTitle}
        period={chartPeriod}
        date={chartDate}
        setPeriod={setChartPeriod}
        setDate={setChartDate}
      />
      <div className="h-[22rem]">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(tick) => {
                const date = new Date(tick.split(',')[0])
                return props.period === 'month'
                  ? date.toLocaleDateString(currentLangInfos.abrvLocale, {
                      month: 'long',
                      year: 'numeric',
                    })
                  : date.toLocaleDateString(currentLangInfos.abrvLocale, {
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
            <Tooltip
              content={
                <CustomTooltip
                  period={chartPeriod}
                  naming={props.tooltipLabel}
                />
              }
            />
            <Area
              type="monotone"
              dataKey={'Visiteurs'}
              stroke={props.color ?? 'var(--darkColor)'}
              fill={props.color ?? 'var(--color)'}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : null
}
