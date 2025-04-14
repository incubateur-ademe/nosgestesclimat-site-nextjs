import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { CookiesPolicy } from '@incubateur-ademe/legal-pages-react/CookiesPolicy'

export const generateMetadata = getCommonMetadata({
  title: t('Politique des cookies - Nos Gestes Climat'),
  description: t(
    'Découvrez comment nous utilisons vos données personnelles pour vous proposer un calculateur de bilan carbone personnel.'
  ),
  alternates: {
    canonical: '/politique-des-cookies',
  },
})

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
    </div>
  )
}
