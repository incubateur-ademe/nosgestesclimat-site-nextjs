'use client'

import Link from '@/components/Link'
import BilanChart from '@/components/charts/BilanChart'
import ServicesChart from '@/components/charts/ServicesChart'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import { defaultMetric } from '@/constants/metric'
import Markdown from '@/design-system/utils/Markdown'
import { useLocale } from '@/hooks/useLocale'
import { useCurrentSimulation, useDisposableEngine } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import { RulePage } from '@publicodes/react-ui'
import Head from 'next/head'
import Engine from 'publicodes'
import { useState } from 'react'
import MetricSwitchButton from './documentationClient/MetricSwitchButton'

type Props = {
  supportedRegions: SupportedRegions
  slugs: string[]
}
export default function DocumentationClient({ slugs }: Props) {
  const locale = useLocale()

  const path = decodeURI(slugs.join('/'))
  const documentationPath = '/documentation'

  const { situation } = useCurrentSimulation()
  const { engine } = useDisposableEngine({ situation })

  const [metric, setMetric] = useState<Metric>(defaultMetric)

  return (
    <div className="p-8 pt-4">
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
              <Markdown>{children}</Markdown>
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
