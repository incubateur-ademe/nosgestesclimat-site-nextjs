import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { currentLocale } from 'next-i18n-router'
import DocumentationRouter from './_components/DocumentationRouter'
import DocumentationServer from './_components/documentationRouter/DocumentationServer'

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string[] }
}) {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t(
      "Documentation, votre calculateur d'empreinte carbone - Nos Gestes Climat"
    ),
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
  params: { slug },
}: {
  params: { slug: string[] }
}) {
  const locale = currentLocale()

  const supportedRegions = getSupportedRegions()

  const rules = await getRules({
    isOptim: false,
    locale,
    regionCode: 'FR',
  })

  return (
    <DocumentationRouter
      supportedRegions={supportedRegions}
      rules={rules}
      slug={slug}
      serverComponent={<DocumentationServer slugs={slug} rules={rules} />}
    />
  )
}
