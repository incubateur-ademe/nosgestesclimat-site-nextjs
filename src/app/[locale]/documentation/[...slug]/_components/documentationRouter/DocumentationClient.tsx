'use client'

import Link from '@/components/Link'
import BilanChart from '@/components/charts/BilanChart'
import ServicesChart from '@/components/charts/ServicesChart'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import { defaultMetric } from '@/constants/model/metric'
import Markdown from '@/design-system/utils/Markdown'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useCurrentSimulation, useDisposableEngine } from '@/publicodes-state'
import type { Metric } from '@/publicodes-state/types'
import { RulePage } from '@publicodes/react-ui'
import Head from 'next/head'
import type Engine from 'publicodes'
import { useState } from 'react'
import MetricSwitchButton from './documentationClient/MetricSwitchButton'

type Props = {
  slugs: string[]
}
export default function DocumentationClient({ slugs }: Props) {
  const locale = useLocale()

  const path = decodeURI(slugs.join('/'))
  const documentationPath = '/documentation'

  const rules = useRules({ isOptim: false })

  const { situation } = useCurrentSimulation()
  const { engine } = useDisposableEngine({ rules, situation })

  const [metric, setMetric] = useState<Metric>(defaultMetric)

  return (
    <div className="mt-4 w-full">
      <PasserTestBanner />
      <MetricSwitchButton
        metric={metric}
        setMetric={(metric) => {
          setMetric(metric)
          engine.setSituation(
            { métrique: `'${metric}'` },
            { keepPreviousSituation: true }
          )
        }}
      />
      <RulePage
        language={locale as 'fr' | 'en'}
        rulePath={(path as string) ?? ''}
        engine={engine as Engine}
        documentationPath={documentationPath}
        searchBar={true}
        renderers={{
          Head,
          Link: ({ children, to }) => <Link href={to || ''}>{children}</Link>,
          Text: ({ children }) => (
            <>
              <Markdown>
                {children
                  .replaceAll('<RavijenChart/>', '')
                  .replaceAll('<RavijenChartSocietaux/>', '')}
              </Markdown>
              {children.includes('<RavijenChart/>') && <BilanChart />}
              {children.includes('<RavijenChartSocietaux/>') && (
                <ServicesChart />
              )}
            </>
          ),
        }}
      />
    </div>
  )
}
