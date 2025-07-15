import { DOCUMENTATION_PATH, NOT_FOUND_PATH } from '@/constants/urls/paths'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import type { DefaultPageProps } from '@/types'
import { capitalizeString } from '@/utils/capitalizeString'
import { decodeRuleNameFromPath } from '@/utils/decodeRuleNameFromPath'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { redirect } from 'next/navigation'
import DocumentationRouter from './_components/DocumentationRouter'
import DocumentationServer from './_components/documentationRouter/DocumentationServer'

export async function generateMetadata({
  params,
}: DefaultPageProps<{
  params: { slug: string[] }
}>) {
  const { locale, slug } = await params
  const { t } = await getServerTranslation({ locale })

  const rules = (await getRules({
    isOptim: false,
    locale,
    regionCode: 'FR',
  })) as NGCRules

  const ruleName = decodeRuleNameFromPath(slug.join('/')) as DottedName

  const rule = rules?.[ruleName]

  return getMetadataObject({
    locale,
    title:
      rule && ruleName
        ? // Dynamic title for each documentation page
          t('Documentation, de la règle : {{ruleTitle}} - Nos Gestes Climat', {
            ruleTitle: capitalizeString(
              getRuleTitle({ ...rule, dottedName: ruleName })
            ),
          })
        : // Fallback title
          t('Documentation, règle du calculateur - Nos Gestes Climat'),
    description: t(
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.'
    ),
    alternates: {
      canonical: `/documentation/${slug.join('/')}`,
    },
  })
}

// The page content is in layout.tsx in order to persist the state
// between the server and the client
export default async function DocumentationPage({
  params,
}: DefaultPageProps<{
  params: { slug: string[] }
}>) {
  const { locale, slug } = await params
  const supportedRegions = getSupportedRegions()

  const rules = (await getRules({
    isOptim: false,
    locale,
    regionCode: 'FR',
  })) as NGCRules

  const ruleName = decodeRuleNameFromPath(slug.join('/')) as DottedName

  if (!ruleName) {
    redirect(NOT_FOUND_PATH)
  }

  const rule = rules?.[ruleName]

  if (!rule) {
    redirect(DOCUMENTATION_PATH)
  }

  return (
    <DocumentationRouter
      supportedRegions={supportedRegions}
      slug={slug}
      serverComponent={
        <DocumentationServer
          locale={locale}
          ruleName={ruleName}
          rule={rule}
          rules={rules}
        />
      }
    />
  )
}
