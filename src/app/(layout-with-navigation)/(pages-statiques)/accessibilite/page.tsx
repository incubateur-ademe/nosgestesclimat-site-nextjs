import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import accessibilityEn from '@/locales/pages/en/accessibility.mdx'
import accessibilityFr from '@/locales/pages/fr/accessibility.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Accessibilité - Nos Gestes Climat',
    description:
      "Informations relatives à l'accessibilité de Nos Gestes Climat.",
    alternates: {
      canonical: '/accessibilite',
    },
  })
}

export default function AccessibilityPage() {
  return <MDXContent contentEn={accessibilityEn} contentFr={accessibilityFr} />
}
