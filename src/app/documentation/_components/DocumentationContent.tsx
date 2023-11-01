'use client'

import Link from '@/components/Link'
import RavijenChart from '@/components/charts/RavijenChart'
import LocalisationBanner from '@/components/translation/LocalisationBanner'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import Head from 'next/head'
import Engine from 'publicodes'
import { RulePage } from 'publicodes-react'
import References from './References'

type Props = {
  supportedRegions: SuppportedRegions
  slugs: string[]
}
export default function DocumentationContent({
  supportedRegions,
  slugs,
}: Props) {
  const { i18n } = useClientTranslation()
  const path = decodeURI(slugs.join('/'))

  const { engine } = useEngine()

  const documentationPath = '/documentation'

  return (
    <>
      <LocalisationBanner supportedRegions={supportedRegions} />
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
              {children.includes('<RavijenChart/>') && <RavijenChart />}
            </>
          ),
          References: References as any,
        }}
      />
    </>
  )
}
