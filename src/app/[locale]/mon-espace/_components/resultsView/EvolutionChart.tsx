'use client'

import Trans from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Locale } from '@/i18nConfig'
import isMobile from 'is-mobile'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

type ChartData = {
  date: Date
  dateStr: string
  value: number
}

type Props = {
  locale: Locale
  chartData: ChartData[]
  lineColor: string
  minValue: number
  maxValue: number
  disabled: boolean
}

export default function EvolutionChart({
  locale,
  chartData,
  lineColor,
  minValue,
  maxValue,
  disabled,
}: Props) {
  const { t } = useClientTranslation()

  const height = isMobile() ? 240 : 400
  const chartId = 'evolution-chart'

  const simulationDescriptionLabels = chartData
    .map((data, index) => {
      const value = (data.value / 1000).toLocaleString(
        locale === 'fr' ? 'fr-FR' : 'en-US',
        {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }
      )

      return t(
        'mon-espace.evolutionGraph.simulationData',
        'Résultat de test n°{{simulationNumber}} du {{simulationDate}} : {{simulationValue}} tonnes',
        {
          simulationNumber: index + 1,
          simulationDate: data.dateStr,
          simulationValue: value,
          interpolation: { escapeValue: false },
        }
      )
    })
    .join('. ')

  const chartLabel = t(
    'mon-espace.evolutionGraph.chartLabel',
    "Graphique d'évolution de l'empreinte carbone montrant {{simulationsCount}} résultats de test. {{simulationsData}}",
    {
      simulationsCount: chartData.length,
      simulationsData: simulationDescriptionLabels,
      interpolation: { escapeValue: false },
    }
  )

  return (
    <div
      className="relative w-full"
      style={{ height: `${height}px` }}
      role="img"
      aria-label={chartLabel}
      aria-describedby={
        isMobile() ? 'evolution-chart-mobile-description' : undefined
      }
      id={chartId}>
      {disabled && (
        <div className="border-primary-400 absolute top-1/2 left-1/2 z-10 flex max-w-96 -translate-x-1/2 -translate-y-full items-center justify-center rounded-xl border-2 bg-white p-6">
          <p className="mb-0 text-center">
            <strong className="text-primary-700">
              <Trans i18nKey="mon-espace.evolutionGraph.chartDisabledTitle.part1">
                Faites une nouvelle simulation
              </Trans>
            </strong>{' '}
            <Trans i18nKey="mon-espace.evolutionGraph.chartDisabledTitle.part2">
              pour avoir accès à l’évolution de votre empreinte
            </Trans>
          </p>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 20,
          }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="dateStr"
            tick={{ fontSize: isMobile() ? 10 : 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#6b7280' }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            tick={{ fontSize: isMobile() ? 10 : 12, fill: '#6b7280' }}
            tickLine={{ stroke: '#6b7280' }}
            axisLine={false}
            domain={[minValue, Math.ceil(maxValue / 2) * 2]}
            tickMargin={8}
            tickFormatter={(value) =>
              (value / 1000).toLocaleString(
                locale === 'fr' ? 'fr-FR' : 'en-US',
                {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }
              )
            }
            label={{
              value: t(
                'mon-espace.evolutionGraph.yAxis',
                'Empreinte en tonnes'
              ),
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2.5}
            dot={{ r: 5, fill: lineColor }}
            activeDot={{ r: 7, fill: lineColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
