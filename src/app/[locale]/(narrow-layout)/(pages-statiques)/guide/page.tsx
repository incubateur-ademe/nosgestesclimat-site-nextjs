import MDXContent from '@/components/mdx/MDXContent'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import GuideFr from '@/locales/guide-mode-groupe/fr/guide.mdx'
import type { DefaultPageProps } from '@/types'

export const generateMetadata = getCommonMetadata({
  title: t('Le guide - Nos Gestes Climat'),
  description: t(
    'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.'
  ),
  alternates: {
    canonical: '/guide',
  },
})

export default async function GuidePage({ params }: DefaultPageProps) {
  const { locale } = await params
  return <MDXContent locale={locale} contentFr={GuideFr} />
}
