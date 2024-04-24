import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import accessibilityEn from '@/locales/pages/en/accessibility.mdx'
import accessibilityEs from '@/locales/pages/es/accessibility.mdx'
import accessibilityFr from '@/locales/pages/fr/accessibility.mdx'

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
    title: t('Accessibilité - Nos Gestes Climat'),
    description: t(
      "Informations relatives à l'accessibilité de Nos Gestes Climat."
    ),
    alternates: {
      canonical: '/accessibilite',
    },
  })
}

export default function AccessibilityPage() {
  return (
    <MDXContent
      contentEn={accessibilityEn}
      contentFr={accessibilityFr}
      contentEs={accessibilityEs}
    />
  )
}
