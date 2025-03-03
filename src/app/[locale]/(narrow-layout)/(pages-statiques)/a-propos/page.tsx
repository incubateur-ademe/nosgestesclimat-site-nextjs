import PasserTestBanner from '@/components/layout/PasserTestBanner'
import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en/about.mdx'
import AboutEs from '@/locales/pages/es/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'
import type { DefaultPageProps } from '@/types'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params

  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('À propos - Nos Gestes Climat'),
    description: t('Informations relatives à Nos Gestes Climat.'),
    alternates: {
      canonical: '/a-propos',
    },
  })
}

export default async function AProposPage({ params }: DefaultPageProps) {
  const { locale } = await params

  return (
    <>
      <PasserTestBanner />

      <MDXContent
        contentEn={AboutEn}
        contentFr={AboutFr}
        contentEs={AboutEs}
        locale={locale}
      />
    </>
  )
}
