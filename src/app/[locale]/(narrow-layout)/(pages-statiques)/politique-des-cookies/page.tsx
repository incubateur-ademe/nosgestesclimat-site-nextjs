import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { CookiesPolicy } from '@incubateur-ademe/legal-pages-react/CookiesPolicy'

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

export default function ViePriveePage() {
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
