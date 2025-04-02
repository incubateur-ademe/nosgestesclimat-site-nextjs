import PasserTestBanner from '@/components/layout/PasserTestBanner'
import MDXContent from '@/components/mdx/MDXContent'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import AboutEn from '@/locales/pages/en/about.mdx'
import AboutEs from '@/locales/pages/es/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'
import type { DefaultPageProps } from '@/types'

export const generateMetadata = getCommonMetadata({
  title: t('À propos - Nos Gestes Climat'),
  description: t('Informations relatives à Nos Gestes Climat.'),
  alternates: {
    canonical: '/a-propos',
  },
})

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
