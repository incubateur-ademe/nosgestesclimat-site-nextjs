import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { PrivacyPolicy } from '@incubateur-ademe/legal-pages-react/PrivacyPolicy'

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
    <div className="markdown">
      <PrivacyPolicy
        includeBetaGouv
        cookieConsentButton={
          <iframe
            title="matomo"
            src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=&fontSize=&fontFamily="
          />
        }
        siteName="Nos Gestes Climat"
        cookies={[
          {
            category: 'Mesure d’audience anonymisée',
            name: 'Matomo',
            expiration: '13 mois',
            finalities: 'Mesure d’audience',
            editor: 'Matomo & ADEME',
            destination: 'France',
          },
        ]}
        thirdParties={[
          {
            name: 'Vercel',
            country: 'États-Unis',
            hostingCountry: 'France (AWS cdg1)',
            serviceType: 'Hébergement',
            policyUrl: 'https://vercel.com/legal/privacy-policy',
          },
          {
            name: 'Scalingo',
            country: 'France',
            hostingCountry: 'France',
            serviceType: 'Base de données',
            policyUrl: 'https://scalingo.com/legal-notice',
          },
        ]}
      />
    </div>
  )
}
