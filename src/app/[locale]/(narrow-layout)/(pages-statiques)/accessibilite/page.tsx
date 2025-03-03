import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import accessibilityEn from '@/locales/pages/en/accessibility.mdx'
import accessibilityEs from '@/locales/pages/es/accessibility.mdx'
import accessibilityFr from '@/locales/pages/fr/accessibility.mdx'
import type { DefaultPageProps } from '@/types'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })
  return getMetadataObject({
    locale,
    title: t('Accessibilité - Nos Gestes Climat'),
    description: t(
      "Informations relatives à l'accessibilité de Nos Gestes Climat."
    ),
    alternates: {
      canonical: '/accessibilite',
    },
  })
}

export default async function AccessibilityPage({ params }: DefaultPageProps) {
  const { locale } = await params
  return (
    <MDXContent
      contentEn={accessibilityEn}
      contentFr={accessibilityFr}
      contentEs={accessibilityEs}
      locale={locale}
    />
  )
}
