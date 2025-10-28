'use client'

import Trans from '@/components/translation/trans/TransClient'
import { orderedCategories } from '@/constants/model/orderedCategories'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import isMobile from 'is-mobile'
import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

type TabId = 'global' | DottedName

type Props = {
  locale: Locale
  simulations: Simulation[]
}

const COLORS: Partial<Record<DottedName, string>> = {
  transport: '#1e58d7',
  logement: '#296c36',
  alimentation: '#c4430a',
  'services sociétaux': '#6e42e5',
  divers: '#b1500c',
}

export default function EvolutionGraph({ locale, simulations }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('global')
  const { t } = useClientTranslation()

  // Get category labels
  const categoryLabels: Partial<Record<DottedName, string>> = {
    transport: t('common.category.transport', 'Transport'),
    alimentation: t('common.category.alimentation', 'Alimentation'),
    logement: t('common.category.logement', 'Logement'),
    divers: t('common.category.divers', 'Divers'),
    'services sociétaux': t('common.category.services', 'Services sociétaux'),
  }

  // Sort simulations by date (oldest to newest)
  const sortedSimulations = [...simulations].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })

  // Transform data for the chart
  const chartData = sortedSimulations.map((simulation) => {
    const date = new Date(simulation.date)
    const value =
      activeTab === 'global'
        ? simulation.computedResults.carbone.bilan
        : simulation.computedResults.carbone.categories[activeTab] || 0

    return {
      date,
      dateStr: date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }),
      value,
    }
  })

  // Get line color based on active tab
  const lineColor =
    activeTab === 'global'
      ? '#a60e66'
      : COLORS[activeTab as DottedName] || '#a60e66'

  // Calculate Y-axis domain
  const values = chartData.map((d) => d.value)
  const maxValue = Math.max(...values, 14)
  const minValue = Math.min(0, Math.min(...values) - 1)

  return (
    <div className="mb-16">
      <h2 className="mb-6">
        <Trans i18nKey="mon-espace.evolutionGraph.title">
          Evolution de mes résultats d'empreinte
        </Trans>
      </h2>

      {/* Tabs */}
      <div className="mb-6 border-b-2 border-slate-200">
        <nav aria-label="Navigation par catégorie">
          <ul className="flex items-end gap-0 md:gap-4">
            {/* Global view tab */}
            <li className="translate-y-0.5">
              <button
                role="tab"
                aria-current={activeTab === 'global'}
                aria-selected={activeTab === 'global'}
                className={`inline-block px-1 py-3 text-base md:px-4 md:text-lg ${
                  activeTab === 'global'
                    ? 'border-primary-600 text-primary-600 border-b-3 font-bold'
                    : 'border-b-3 border-transparent text-slate-600'
                }`}
                onClick={() => setActiveTab('global')}>
                <Trans i18nKey="mon-espace.evolutionGraph.tabs.global">
                  Vue globale
                </Trans>
              </button>
            </li>

            {/* Category tabs */}
            {orderedCategories.map((category) => (
              <li key={category} className="translate-y-0.5">
                <button
                  role="tab"
                  aria-current={activeTab === category}
                  aria-selected={activeTab === category}
                  className={`inline-block px-1 py-3 text-base md:px-4 md:text-lg ${
                    activeTab === category
                      ? 'border-primary-600 text-primary-600 border-b-3 font-bold'
                      : 'border-b-3 border-transparent text-slate-600'
                  }`}
                  onClick={() => setActiveTab(category)}>
                  {categoryLabels[category]}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Chart */}
      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
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
    </div>
  )
}
