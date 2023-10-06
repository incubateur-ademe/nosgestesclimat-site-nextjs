'use client'

import Link from '@/components/Link'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import Head from 'next/head'
import Engine from 'publicodes'
import { RulePage } from 'publicodes-react'
import { useMemo } from 'react'
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

  const { user } = useUser()

  const lang = useLocale()

  const { data: rules } = useRules({
    lang: lang || 'fr',
    region: supportedRegions[user.region?.code] ? user.region.code : 'FR',
    isOptim: false,
  })

  const engine = useMemo(() => rules && new Engine(rules as any), [rules])

  const documentationPath = '/documentation'

  console.log('TODO: handle og:image')

  if (!engine) return

  return (
    <RulePage
      language={i18n.language as 'fr' | 'en'}
      rulePath={(path as string) ?? ''}
      engine={engine as any}
      documentationPath={documentationPath}
      renderers={{
        Head,
        Link: ({ children, to }) => <Link href={to || ''}>{children}</Link>,
        Text: ({ children }) => <Markdown>{children}</Markdown>,
        References: References as any,
      }}
    />
  )
}
