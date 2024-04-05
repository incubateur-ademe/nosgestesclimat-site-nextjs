import MDXContent from '@/components/mdx/MDXContent'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import PrivacyEn from '@/locales/pages/en/privacy.mdx'
import PrivacyFr from '@/locales/pages/fr/privacy.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: t('Politique de confidentialité - Nos Gestes Climat'),
    description: t(
      'Découvrez comment nous utilisons vos données personnelles pour vous proposer un simulateur de bilan carbone personnel.'
    ),
    alternates: {
      canonical: '/politique-de-confidentialite',
    },
  })
}

export default function ViePriveePage() {
  return <MDXContent contentEn={PrivacyEn} contentFr={PrivacyFr} />
}
