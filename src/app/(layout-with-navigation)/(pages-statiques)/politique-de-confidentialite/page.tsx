import MDXContent from '@/components/mdx/MDXContent'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import PrivacyEn from '@/locales/pages/en/privacy.mdx'
import PrivacyEs from '@/locales/pages/es/privacy.mdx'
import PrivacyFr from '@/locales/pages/fr/privacy.mdx'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

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
  return (
    <MDXContent
      contentEn={PrivacyEn}
      contentFr={PrivacyFr}
      contentEs={PrivacyEs}
    />
  )
}
