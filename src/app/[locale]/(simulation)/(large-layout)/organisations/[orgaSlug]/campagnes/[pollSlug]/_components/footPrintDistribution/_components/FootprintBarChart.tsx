'use client'

import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { twMerge } from 'tailwind-merge'

type Props = {
  groupFootprint: number
  userFootprint?: number
  targetValue?: number
  targetYear?: number
  className?: string
}

export default function FootprintBarChart({
  groupFootprint,
  userFootprint,
  targetValue = 2,
  targetYear = 2050,
  className,
}: Props) {
  const { t } = useClientTranslation()

  const maxValue =
    Math.ceil(Math.max(groupFootprint, userFootprint || 0, targetValue) / 5) * 5

  const groupFormatted = formatCarbonFootprint(groupFootprint * 1000, {
    maximumFractionDigits: 1,
  })
  const userFormatted = userFootprint
    ? formatCarbonFootprint(userFootprint * 1000, {
        maximumFractionDigits: 1,
      })
    : null

  const targetFormatted = formatCarbonFootprint(targetValue * 1000, {
    maximumFractionDigits: 1,
  })

  const data = [
    {
      name: t(
        'pollResults.footprintBarChart.groupFootprint',
        'Empreinte moyenne du groupe'
      ),
      value: groupFootprint,
      formattedValue: `${groupFormatted.formattedValue} ${groupFormatted.unit}`,
    },
    ...(userFootprint
      ? [
          {
            name: t(
              'pollResults.footprintBarChart.userFootprint',
              'Votre empreinte'
            ),
            value: userFootprint,
            formattedValue: `${userFormatted?.formattedValue} ${userFormatted?.unit}`,
          },
        ]
      : []),
  ]

  const getAccessibleDescription = () => {
    let description = t(
      'pollResults.footprintBarChart.accessibleDescription.chart',
      'Graphique en barres montrant la comparaison des empreintes carbone. '
    )
    description +=
      t(
        'pollResults.footprintBarChart.accessibleDescription.groupFootprint',
        "L'empreinte moyenne du groupe est de {{value}} {{unit}}.",
        {
          value: groupFormatted.formattedValue,
          unit: groupFormatted.unit,
        }
      ) + ' '

    if (userFootprint) {
      description +=
        t(
          'pollResults.footprintBarChart.accessibleDescription.userFootprint',
          'Votre empreinte personnelle est de {{value}} {{unit}}.',
          {
            value: userFormatted?.formattedValue,
            unit: userFormatted?.unit,
          }
        ) + ' '
    }

    description +=
      t(
        'pollResults.footprintBarChart.accessibleDescription.target',
        "L'objectif à atteindre d'ici {{year}} est de {{value}} {{unit}}.",
        {
          year: targetYear,
          value: targetFormatted.formattedValue,
          unit: targetFormatted.unit,
        }
      ) + ' '

    if (userFootprint) {
      const comparison =
        userFootprint > groupFootprint
          ? t(
              'pollResults.footprintBarChart.accessibleDescription.higher',
              'supérieure'
            )
          : t(
              'pollResults.footprintBarChart.accessibleDescription.lower',
              'inférieure'
            )
      description +=
        t(
          'pollResults.footprintBarChart.accessibleDescription.userComparison',
          'Votre empreinte est {{comparison}} à celle du groupe.',
          {
            comparison,
          }
        ) + ' '
    }

    const groupVsTarget =
      groupFootprint > targetValue
        ? t(
            'pollResults.footprintBarChart.accessibleDescription.higher',
            'supérieure'
          )
        : t(
            'pollResults.footprintBarChart.accessibleDescription.lower',
            'inférieure'
          )
    description += t(
      'pollResults.footprintBarChart.accessibleDescription.groupComparison',
      "L'empreinte du groupe est {{comparison}} à l'objectif.",
      {
        comparison: groupVsTarget,
      }
    )

    return description
  }

  const CustomBar = (props: any) => {
    const { payload, fill, x, y, width, height } = props
    const formattedValue = payload?.formattedValue || ''

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={4}
          ry={4}
          role="img"
          aria-label={`${payload?.name}: ${formattedValue}`}
        />
        <text
          x={x + width / 2}
          y={y - 16}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="12"
          fontWeight="600">
          {formattedValue}
        </text>
      </g>
    )
  }

  return (
    <div className={twMerge('w-full', className)}>
      <div className="sr-only" aria-live="polite">
        {getAccessibleDescription()}
      </div>

      <div className="relative rounded-xl p-6">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 120, left: 0, bottom: 5 }}
            barCategoryGap="20%"
            maxBarSize={70}>
            <XAxis
              dataKey="name"
              axisLine
              tickLine={false}
              tick={false}
              interval={0}
            />

            <YAxis
              domain={[0, maxValue + 2]}
              axisLine
              tickLine
              tick={{ fontSize: 12, fill: '#444' }}
              tickFormatter={(value) =>
                `${value} ${parseFloat(targetFormatted.formattedValue ?? 0) > 1 ? targetFormatted.unit?.replace('s', '') : `${targetFormatted.unit}`}`
              }
              width={80}
              ticks={Array.from(
                { length: Math.floor(maxValue / 5) + 1 },
                (_, i) => i * 5
              )}
            />

            <Bar dataKey="value" shape={<CustomBar />}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#8e9eeb' : '#585ad3'}
                />
              ))}
            </Bar>

            <ReferenceLine
              y={targetValue}
              stroke="#d40d83"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: t(
                  'pollResults.footprintBarChart.targetLabel',
                  'Objectif {{year}}',
                  { year: targetYear }
                ),
                position: 'right',
                style: {
                  fill: '#d40d83',
                  fontSize: '12px',
                  fontWeight: '500',
                  textAnchor: 'start',
                },
              }}
            />

            <ReferenceLine
              y={2}
              stroke="transparent"
              label={{
                value: `2 ${targetFormatted.unit}`,
                position: 'left',
                style: {
                  fill: '#d40d83',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  transform: 'translateX(-2px)',
                },
              }}
            />
          </BarChart>
        </ResponsiveContainer>

        {userFootprint && (
          <div className="mt-6 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary-400 h-4 w-4 rounded"></div>
              <span className="text-xs text-gray-900">
                {t(
                  'pollResults.footprintBarChart.legend.groupFootprint',
                  'Empreinte moyenne du groupe'
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary-700 h-4 w-4 rounded"></div>
              <span className="text-xs text-gray-900">
                {t(
                  'pollResults.footprintBarChart.legend.userFootprint',
                  'Votre empreinte'
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
