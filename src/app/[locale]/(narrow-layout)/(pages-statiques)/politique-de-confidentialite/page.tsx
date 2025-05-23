import Trans from '@/components/translation/trans/TransServer'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import { PrivacyPolicy } from '@incubateur-ademe/legal-pages-react/PrivacyPolicy'

export const generateMetadata = getCommonMetadata({
  title: t('Politique de confidentialité - Nos Gestes Climat'),
  description: t(
    'Découvrez comment nous utilisons vos données personnelles pour vous proposer un calculateur de bilan carbone personnel.'
  ),
  alternates: {
    canonical: '/politique-de-confidentialite',
  },
})

export default async function ViePriveePage({ params }: DefaultPageProps) {
  const { locale } = await params
  return (
    <div className="markdown">
      <p>
        <Trans locale={locale}>
          La simulation et les calculs se font dans votre navigateur Web, donc
          les réponses aux questions restent chez vous, nous n'en collectons
          aucune.
        </Trans>
      </p>
      <p>
        <Trans locale={locale}>
          Cependant, nous suivons quelques informations sur votre utilisation de
          ce calculateur, telles que les pages consultées et le temps passé,
          dans l'unique but de l'améliorer.
        </Trans>
      </p>
      <p>
        <Trans locale={locale}>
          En particulier, nous suivons l'adresse de la page de fin de
          simulation, qui contient le total de votre empreinte et sa répartition
          en grande catégories (transport, logement, etc.)
        </Trans>
      </p>
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
            name: 'Scalingo',
            country: 'France',
            hostingCountry: 'France',
            serviceType: 'Hébergement site',
            policyUrl: 'https://scalingo.com/legal-notice',
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
