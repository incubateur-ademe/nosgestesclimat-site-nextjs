import TransServer from '@/components/translation/trans/TransServer'
import {
  organisationsAccueilClickCommencerBottom,
  organisationsAccueilClickDemoBottom,
} from '@/constants/tracking/pages/organisationsAccueil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function CTAFooter({ locale }: { locale: string }) {
  const { t } = await getServerTranslation(locale)

  return (
    <section className="pt-16 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-full md:w-[34rem]">
          <h2>
            <TransServer locale={locale}>
              Créez votre compte organisation
            </TransServer>
          </h2>

          <p className="mb-8">
            <strong className="text-primary-700">
              <TransServer locale={locale}>2 petites minutes</TransServer>
            </strong>{' '}
            {t(
              'pour créer un compte, et vous pourrez retrouver tous nos services gratuitement\u202f!'
            )}
          </p>

          <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row">
            <ButtonLink
              trackingEvent={organisationsAccueilClickCommencerBottom}
              href="/organisations/connexion">
              <TransServer locale={locale}>Créer un compte</TransServer>
            </ButtonLink>

            <ButtonLink
              color="text"
              className="font-normal underline"
              href="/contact?motif=demo"
              trackingEvent={organisationsAccueilClickDemoBottom}>
              <TransServer locale={locale}>Demander une démo</TransServer>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
