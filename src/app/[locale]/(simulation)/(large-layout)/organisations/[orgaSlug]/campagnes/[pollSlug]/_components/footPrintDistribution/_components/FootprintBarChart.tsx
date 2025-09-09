'use client'

import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
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
  /** Valeur de l'empreinte moyenne du groupe en tonnes */
  groupFootprint: number
  /** Valeur de l'empreinte de l'utilisateur en tonnes (optionnelle) */
  userFootprint?: number
  /** Objectif à atteindre en tonnes (par défaut 2 tonnes pour 2050) */
  targetValue?: number
  /** Année de l'objectif (par défaut 2050) */
  targetYear?: number
  /** Titre du graphique */
  title?: string
  /** Classe CSS personnalisée */
  className?: string
}

export default function FootprintBarChart({
  groupFootprint,
  userFootprint,
  targetValue = 2,
  targetYear = 2050,
  title = 'Comparaison des empreintes carbone',
  className,
}: Props) {
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
      name: 'Empreinte moyenne du groupe',
      value: groupFootprint,
      formattedValue: `${groupFormatted.formattedValue} ${groupFormatted.unit}`,
    },
    ...(userFootprint
      ? [
          {
            name: 'Votre empreinte',
            value: userFootprint,
            formattedValue: `${userFormatted?.formattedValue} ${userFormatted?.unit}`,
          },
        ]
      : []),
  ]

  const getAccessibleDescription = () => {
    let description = `Graphique en barres montrant la comparaison des empreintes carbone. `
    description += `L'empreinte moyenne du groupe est de ${groupFormatted.formattedValue} ${groupFormatted.unit}. `

    if (userFootprint) {
      description += `Votre empreinte personnelle est de ${userFormatted?.formattedValue} ${userFormatted?.unit}. `
    }

    description += `L'objectif à atteindre d'ici 2050 est de ${targetFormatted.formattedValue} ${targetFormatted.unit}. `

    if (userFootprint) {
      const comparison =
        userFootprint > groupFootprint ? 'supérieure' : 'inférieure'
      description += `Votre empreinte est ${comparison} à celle du groupe. `
    }

    const groupVsTarget =
      groupFootprint > targetValue ? 'supérieure' : 'inférieure'
    description += `L'empreinte du groupe est ${groupVsTarget} à l'objectif.`

    return description
  }

  const CustomBar = (props: any) => {
    const { payload, fill, x, y, width, height } = props
    const value = payload?.value || 0
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
      <h3 className="sr-only">{title}</h3>

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
                value: `Objectif ${targetYear}`,
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
              <span className="text-sm text-gray-700">
                Empreinte moyenne du groupe
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary-700 h-4 w-4 rounded"></div>
              <span className="text-sm text-gray-700">Votre empreinte</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
