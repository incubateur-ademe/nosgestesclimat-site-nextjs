'use client'

import Link from '@/components/Link'
import Markdown from '@/design-system/utils/Markdown'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import { safeGetSituation } from '@/publicodes-state/helpers/safeGetSituation'
import { Situation } from '@/publicodes-state/types'
import { SuppportedRegions } from '@/types/international'
import Head from 'next/head'
import Engine from 'publicodes'
import { RulePage } from 'publicodes-react'
import { useEffect, useMemo } from 'react'
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

  const { user, getCurrentSimulation } = useUser()

  const lang = useLocale()

  const { data: rules } = useRules({
    lang: lang || 'fr',
    region: supportedRegions[user.region?.code] ? user.region.code : 'FR',
    isOptim: false,
  })

  const currentSimulation = getCurrentSimulation()
  const situation = currentSimulation?.situation

  const engine = useMemo<Engine | null>(
    () => (rules ? new Engine(rules as any) : null),
    [rules]
  )

  //TODO: this is shit
  useEffect(() => {
    if (engine && situation) {
      const rules = Object.entries(engine.getParsedRules()).map(
        (rule: (string | any)[]) => rule[0]
      )

      const safeSituation: Situation = safeGetSituation({
        situation,
        everyRules: rules,
      })

      engine.setSituation(safeSituation as any)
    }
  }, [engine, situation])

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
