'use client'

import Trans from '@/components/translation/trans/TransClient'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Categories } from '@incubateur-ademe/nosgestesclimat'
import isMobile from 'is-mobile'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

type Props = {
  categoryValues: Record<Categories, number>
  className?: string
}

const COLORS: Record<Categories, string> = {
  transport: '#60A5FA',
  logement: '#10B981',
  alimentation: '#F59E0B',
  'services sociétaux': '#8B5CF6',
  divers: '#FCD34D',
}

export default function CategoryDistribution({
  categoryValues,
  className,
}: Props) {
  const { t } = useClientTranslation()

  const categoryLabels = {
    transport: t('common.category.transport', 'Transport'),
    alimentation: t('common.category.alimentation', 'Alimentation'),
    logement: t('common.category.logement', 'Logement'),
    divers: t('common.category.divers', 'Divers'),
    'services sociétaux': t('common.category.services', 'Services sociétaux'),
  }

  const categoryLabelsFull = {
    transport: t('common.category.transport', 'Transport'),
    alimentation: t('common.category.alimentation', 'Alimentation'),
    logement: t('common.category.logement', 'Logement'),
    divers: t('common.category.divers', 'Divers'),
    'services sociétaux': t('common.category.services', 'Services sociétaux'),
  }

  const formattedData = Object.entries(categoryValues).map(([key, value]) => {
    const formattedValue = formatCarbonFootprint(value, {
      maximumFractionDigits: 1,
    })
    return {
      name: `${categoryLabels[key as Categories]}`,
      nameFull: `${categoryLabelsFull[key as Categories]}`,
      value: value,
      color: COLORS[key as Categories],
      formattedValue,
    }
  })

  const getAccessibleDescription = () => {
    let description = t(
      'pollResults.categoryDistribution.accessibleDescription.chart',
      'Graphique en donut montrant la répartition des émissions par catégorie. '
    )
    formattedData.forEach((item) => {
      description +=
        t(
          'pollResults.categoryDistribution.accessibleDescription.category',
          '{{name}}: {{value}} {{unit}}.',
          {
            name: item.nameFull,
            value: item.formattedValue.formattedValue,
            unit: item.formattedValue.unit,
          }
        ) + ' '
    })
    return description
  }

  const CustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, name, formattedValue } =
      props
    const RADIAN = Math.PI / 180
    const radius = isMobile()
      ? innerRadius + (outerRadius - innerRadius) * 1.2
      : innerRadius + (outerRadius - innerRadius) * 1.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={isMobile() ? '10' : '16'}
        fontWeight="600">
        {name}
        <tspan
          x={x}
          dy={isMobile() ? '12' : '16'}
          fontWeight="normal"
          fontSize={isMobile() ? '10' : '14'}>
          {formattedValue.formattedValue} {formattedValue.unit}
        </tspan>
      </text>
    )
  }

  return (
    <div className={className}>
      <h3 className="mb-6">
        <strong>
          <Trans i18nKey="pollResults.pollResults.distribution.category_distribution.title">
            Répartition par poste d'émission
          </Trans>
        </strong>{' '}
        <Trans i18nKey="pollResults.pollResults.distribution.category_distribution.title_detail">
          (moyennes)
        </Trans>
      </h3>

      <div className="sr-only" aria-live="polite">
        {getAccessibleDescription()}
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={isMobile() ? 250 : 300}>
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={isMobile() ? 80 : 100}
              innerRadius={isMobile() ? 40 : 50}
              fill="#8884d8"
              dataKey="value">
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
