import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ContentEn from '@/locales/pages/en/CGU.mdx'
import ContentFr from '@/locales/pages/fr/CGU.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'CGU - Nos Gestes Climat',
    description: "Conditions générales d'utilisation du site.",
    alternates: {
      canonical: '/cgu',
    },
  })
}

export default function CGUPage() {
  return <MDXContent contentEn={ContentEn} contentFr={ContentFr} />
}
