import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import GuideFr from '@/locales/guide-mode-groupe/fr/guide.mdx'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: t('Le guide - Nos Gestes Climat'),
    description: t(
      'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.'
    ),
    alternates: {
      canonical: '/guide',
    },
  })
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <MDXContent locale={locale} contentFr={GuideFr} />
}
