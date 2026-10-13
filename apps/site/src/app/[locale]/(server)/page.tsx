import CTAButtons from '@/components/cta/CTAButtons'

import Footer from '@/components/layout/Footer'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/trans/TransServer'
import LandingPage from '@/design-system/layout/LandingPage'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { type Locale } from '@/i18nConfig'
import Partners from '../../../components/landing-pages/Partners'
import CollectivelyCommit from '../_components/CollectivelyCommit'
import DecryptChallenges from '../_components/DecryptChallenges'
import DidYouKnowMainLanding from '../_components/DidYouKnowMainLanding'
import HomePageDescription from '../_components/HomePageDescription'
import HomepageSubtitle from '../_components/HomepageSubtitle'
import InteractiveIllustration from '../_components/InteractiveIllustration'
import Mobilise from '../_components/Mobilise'
import ModelInfo from '../_components/ModelInfo'
import TheySpeakAboutUs from '../_components/TheySpeakAboutUs'
import TwoFootprints from '../_components/TwoFootprints'

export const generateMetadata = getCommonMetadata({
  title: t('Calculez votre empreinte carbone et eau avec Nos Gestes Climat'),
  image: '/_static/cms/calculer_empreinte_carbone_et_eau_ecccc9a625.png',
  description: t(
    'Comme 2 millions de personnes, mesurez votre empreinte écologique en 10 minutes. Un outil gratuit pour faire le bilan et réduire vos émissions de CO2.'
  ),
  alternates: {
    canonical: '',
  },
})

export default async function Homepage({ params }: PageProps<'/[locale]'>) {
  const locale = (await params).locale as Locale

  return (
    <>
      <JSONLD
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://nosgestesclimat.fr',
            name: 'Nos Gestes Climat',
            logo: '/_static/cms/petit_logo_006dd01955.png',
          },
        ]}
      />
      <LandingPage
        withHeader={false}
        heroIllustration={<InteractiveIllustration />}
        heroTitle={<Trans>Découvrez votre empreinte carbone</Trans>}
        heroDescription={
          <div className="flex flex-col items-center gap-6 md:items-start md:gap-10">
            <HomePageDescription />

            <div className="flex flex-col items-center gap-6 md:order-2 md:mt-0 md:items-start">
              <CTAButtons withCollectiveTest withRestart />

              {/* Displayed on mobile only */}
              <div className="mb-8 md:hidden">
                <HomepageSubtitle />
                <div className="mx-auto mt-4 max-w-80 md:mt-0">
                  <InteractiveIllustration />
                </div>
              </div>

              {/* Displayed on desktop only */}
              <div className="hidden md:block">
                <HomepageSubtitle />
              </div>
            </div>
          </div>
        }
        heroPartners={<Partners />}>
        <TwoFootprints />

        <DidYouKnowMainLanding />

        <Mobilise />

        <DecryptChallenges locale={locale} />

        <CollectivelyCommit />

        <ModelInfo />

        <TheySpeakAboutUs />
      </LandingPage>

      <Footer backgroundColor="white" locale={locale} />
    </>
  )
}
