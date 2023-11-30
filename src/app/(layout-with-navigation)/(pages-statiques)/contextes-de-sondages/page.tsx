import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ContentEn from '@/locales/pages/en/contextes-sondage.mdx'
import ContentFr from '@/locales/pages/fr/contextes-sondage.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Documentation Contexte Sondage - Nos Gestes Climat',
    description:
      "Informations relatives à la création d'un contexte spécifique.",
    alternates: {
      canonical: '/contextes-de-sondages',
    },
  })
}

export default function ContextesSondagesPage() {
  return <MDXContent contentEn={ContentEn} contentFr={ContentFr} />
}
