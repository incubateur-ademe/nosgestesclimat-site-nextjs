'use client'

import Link from '@/components/Link'
import BilanChart from '@/components/charts/BilanChart'
import ServicesChart from '@/components/charts/ServicesChart'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import Head from 'next/head'
import Engine from 'publicodes'
import { RulePage } from 'publicodes-react'
import References from '../../../_components/References'

type Props = {
  supportedRegions: SuppportedRegions
  slugs: string[]
}
export default function DocumentationClient({ slugs }: Props) {
  const { i18n } = useClientTranslation()

  const path = decodeURI(slugs.join('/'))

  const { engine } = useEngine()

  const documentationPath = '/documentation'

  return (
    <div className="p-8">
      <RulePage
        language={i18n.language as 'fr' | 'en'}
        rulePath={(path as string) ?? ''}
        engine={engine as Engine}
        documentationPath={documentationPath}
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
          References: References as any,
        }}
      />
    </div>
  )
}
