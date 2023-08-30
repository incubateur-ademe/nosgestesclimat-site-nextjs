'use client'

import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import useEngine from '@/publicodes-state/simulationProvider/useEngine'
import Head from 'next/head'
import Link from 'next/link'
import { RulePage } from 'publicodes-react'
import References from './References'

export default function DocumentationContent() {
  const { i18n } = useClientTranslation()
  const path = window.location.pathname.split('/documentation/')[1]

  const locale = useLocale()

  const {
    user: { region },
  } = useUser()

  const { data: rules } = useRules({
    lang: locale || 'fr',
    region: region?.code || 'FR',
  })
  const { engine } = useEngine(rules)

  // console.log('engineParsedRules:', engine.context.parsedRules)
  // console.log('url:', url)
  const documentationPath = '/documentation'

  console.log('TODO: handle og:image')

  return (
    <RulePage
      language={i18n.language as 'fr' | 'en'}
      rulePath={(path as string) ?? ''}
      engine={engine}
      documentationPath={documentationPath}
      renderers={{
        Head,
        Link: ({ children, to }) => <Link href={to || ''}>{children}</Link>,
        Text: ({ children }) => (
          <>
            {/*
              <Helmet>
                <meta
                  property="og:image"
                  content={`https://ogimager.osc-fr1.scalingo.io/capture/${encodeURIComponent(
                    window.location.href
                  )}/${encodeURIComponent('documentation-rule-root header')}`}
                />
              </Helmet>
              */}
            <Markdown>{children}</Markdown>
            {/*children.includes('<RavijenChart/>') && (
                <GraphContainer>
                  <RavijenChart />
                </GraphContainer>
              )*/}
            {/*children.includes('<RavijenChartSocietaux/>') && (
                <GraphContainer>
                  <RavijenChart target="services sociétaux" numberBottomRight />
                </GraphContainer>
              )*/}
          </>
        ),
        References: References as any,
      }}
    />
  )
}
