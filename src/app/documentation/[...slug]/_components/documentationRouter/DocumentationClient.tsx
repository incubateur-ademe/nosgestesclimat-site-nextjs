'use client'

import Link from '@/components/Link'
import BilanChart from '@/components/charts/BilanChart'
import ServicesChart from '@/components/charts/ServicesChart'
import PasserTestBanner from '@/components/layout/PasserTestBanner'
import Markdown from '@/design-system/utils/Markdown'
import { useLocale } from '@/hooks/useLocale'
import { useEngine } from '@/publicodes-state'
import { SupportedRegions } from '@incubateur-ademe/nosgestesclimat'
import { RulePage } from '@publicodes/react-ui'
import Head from 'next/head'
import Engine from 'publicodes'

type Props = {
  supportedRegions: SupportedRegions
  slugs: string[]
}
export default function DocumentationClient({ slugs }: Props) {
  const locale = useLocale()

  const path = decodeURI(slugs.join('/'))

  const { engine } = useEngine()

  const documentationPath = '/documentation'

  return (
    <div className="p-8">
      <PasserTestBanner />

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
