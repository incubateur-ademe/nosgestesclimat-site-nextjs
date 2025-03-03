import Baseline from '@/components/organisations/Baseline'
import TransServer from '@/components/translation/trans/TransServer'
import {
  organisationsAccueilClickCommencer,
  organisationsAccueilClickDemo,
} from '@/constants/tracking/pages/organisationsAccueil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import Image from 'next/image'

export default async function HeroSection({ locale }: { locale: string }) {
  const { t } = await getServerTranslation(locale)

  return (
    <div className="flex flex-wrap justify-center gap-12 pt-14 lg:flex-nowrap lg:justify-start lg:gap-16">
      <div className="max-w-full md:w-[34rem]">
        <h1>
          <TransServer locale={locale} i18nKey="organisations.accueil.titre">
            Nos Gestes Climat pour les organisations
          </TransServer>
        </h1>

        <div className="mb-12 text-sm md:text-lg">
          <Baseline />
        </div>
        <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:justify-start md:items-baseline md:gap-8 lg:justify-start">
          <ButtonLink
            href="/organisations/connexion"
            trackingEvent={organisationsAccueilClickCommencer}>
            <TransServer locale={locale}>Commencer</TransServer>
          </ButtonLink>

          <ButtonLink
            color="text"
            href="/organisations/demander-demo"
            onClick={() => {
              trackEvent(organisationsAccueilClickDemo)
            }}>
            <TransServer locale={locale}>Demander une démo</TransServer>
          </ButtonLink>
        </div>
      </div>

      <div>
        <Image
          className="self-start"
          src="/images/illustrations/people-with-paperboard.png"
          width="400"
          height="400"
          alt={t('Groupe de personnes devant un paperboard')}
        />
      </div>
    </div>
  )
}
