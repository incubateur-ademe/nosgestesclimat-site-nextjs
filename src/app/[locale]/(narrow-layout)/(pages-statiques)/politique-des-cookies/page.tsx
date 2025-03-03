import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { CookiesPolicy } from '@incubateur-ademe/legal-pages-react/CookiesPolicy'
import PostHogCookieConsentBanner from './_components/PostHogCookieConsentBanner'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: t('Politique des cookies - Nos Gestes Climat'),
    description: t(
      'Découvrez comment nous utilisons vos données personnelles pour vous proposer un calculateur de bilan carbone personnel.'
    ),
    alternates: {
      canonical: '/politique-des-cookies',
    },
  })
}

export default function CookiesPolicyPage() {
  return (
    <div className="markdown">
      <CookiesPolicy
        analyticTool={{
          name: 'Matomo',
          cookieListUrl: 'https://matomo.org/faq/general/faq_146/',
          policyUrl: 'https://matomo.org/privacy-policy/',
        }}
        cookieConsentButton={
          <iframe
            title="matomo"
            src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=&fontSize=&fontFamily="
          />
        }
        siteName="Nos Gestes Climat"
      />

      <h2>
        <Trans>Cookies utilisés par PostHog</Trans>
      </h2>
      <p>
        <Trans>
          Nous utilisons également PostHog pour mesurer l'audience de notre
          site. La liste des cookies utilisés est disponible ici :
        </Trans>
      </p>
      <p>
        <a href="https://www.cookie.is/service/posthog-analytics#">
          <Trans>Voir la liste des cookies utilisés par PostHog</Trans>
        </a>
      </p>

      <PostHogCookieConsentBanner />
    </div>
  )
}
