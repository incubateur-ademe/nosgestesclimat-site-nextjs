import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ContentEn from '@/locales/pages/en/CGU.mdx'
import ContentEs from '@/locales/pages/es/CGU.mdx'
import ContentFr from '@/locales/pages/fr/CGU.mdx'
import type { DefaultPageProps } from '@/types'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)
  return getMetadataObject({
    locale,
    title: t('CGU - Nos Gestes Climat'),
    description: t("Conditions générales d'utilisation du site."),
    alternates: {
      canonical: '/cgu',
    },
  })
}

export default async function CGUPage({ params }: DefaultPageProps) {
  const { locale } = await params

  return (
    <MDXContent
      contentEn={ContentEn}
      contentFr={ContentFr}
      contentEs={ContentEs}
      locale={locale}
    />
  )
}
