import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import PrivacyEn from '@/locales/pages/en/privacy.mdx'
import PrivacyFr from '@/locales/pages/fr/privacy.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Politique de confidentialité - Nos Gestes Climat',
    description:
      'Découvrez comment nous utilisons vos données personnelles pour vous proposer un simulateur de bilan carbone personnel.',
    alternates: {
      canonical: '/politique-de-confidentialite',
    },
  })
}

export default function ViePriveePage() {
  return <MDXContent contentEn={PrivacyEn} contentFr={PrivacyFr} />
}
