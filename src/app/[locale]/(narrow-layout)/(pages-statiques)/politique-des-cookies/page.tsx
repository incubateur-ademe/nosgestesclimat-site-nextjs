import Trans from '@/components/translation/trans/TransServer'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import { CookiesPolicy } from '@incubateur-ademe/legal-pages-react/CookiesPolicy'
import PostHogCookieConsentBanner from './_components/PostHogCookieConsentBanner'

export const generateMetadata = getCommonMetadata({
  title: t('Politique des cookies - Nos Gestes Climat'),
  description: t(
    'Découvrez comment nous utilisons vos données personnelles pour vous proposer un calculateur de bilan carbone personnel.'
  ),
  alternates: {
    canonical: '/politique-des-cookies',
  },
})

export default async function CookiesPolicyPage({ params }: DefaultPageProps) {
  const { locale } = await params

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
            src="https://stats.beta.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=&fontSize=&fontFamily="
          />
        }
        siteName="Nos Gestes Climat"
      />

      <h2>
        <Trans locale={locale}>Cookies utilisés par PostHog</Trans>
      </h2>
      <p>
        <Trans locale={locale}>
          Nous utilisons également PostHog pour mesurer l'audience de notre
          site. La liste des cookies utilisés est disponible ici :
        </Trans>
      </p>
      <p>
        <a href="https://www.cookie.is/service/posthog-analytics#">
          <Trans locale={locale}>
            Voir la liste des cookies utilisés par PostHog
          </Trans>
        </a>
      </p>

      <PostHogCookieConsentBanner />
    </div>
  )
}
