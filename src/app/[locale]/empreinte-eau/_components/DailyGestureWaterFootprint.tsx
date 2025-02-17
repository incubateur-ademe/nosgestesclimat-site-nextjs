import DailyGestures from '@/components/landing-pages/DailyGestures'
import TransServer from '@/components/translation/trans/TransServer'
import { trackingActionClickPageBottom } from '@/constants/tracking/actions'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import {
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'

export default async function DailyGestureWaterFootprint({
  locale,
}: {
  locale: string
}) {
  const { t } = await getServerTranslation(locale)

  const gesturesKeysForTranslation = {
    alimentation: t('Alimentation'),
    clothing: t('Vêtements'),
  }

  return (
    <DailyGestures
      title={
        <TransServer locale={locale}>
          Les gestes du quotidien pour préserver nos ressources en eau
        </TransServer>
      }
      description={
        <>
          <p>
            <TransServer locale={locale}>
              L’eau est{' '}
              <strong className="text-primary-600">au cœur de nos vies</strong>{' '}
              et de notre consommation quotidienne, bien{' '}
              <strong className="text-primary-600">
                au-delà de ce que nous observons à la maison
              </strong>
              . Chaque jour, des milliers de litres d’eau sont utilisés pour
              produire les aliments que nous mangeons, les vêtements que nous
              portons et l’énergie que nous consommons.
            </TransServer>
          </p>

          <p className="mb-0">
            <TransServer locale={locale}>
              Voici quelques exemples de gestes qui auront un impact important
              sur votre consommation eau indirecte :
            </TransServer>
          </p>
        </>
      }
      trackingEvents={{
        start: getLandingClickCTAStart(
          '/empreinte-eau',
          trackingActionClickPageBottom
        ),
        resume: getLandingClickCTAResume(
          '/empreinte-eau',
          trackingActionClickPageBottom
        ),
        results: getLandingClickCTAResults(
          '/empreinte-eau',
          trackingActionClickPageBottom
        ),
      }}
      gestures={{
        [gesturesKeysForTranslation.alimentation]: {
          imageSrc: '/images/illustrations/empreinte-alimentation.svg',
          imageAlt: t(
            "Un épi de maïs et un avocat, illustrant le fait d'économiser l'eau dans l'alimentation"
          ),
          gestureList: [
            t('Cuisiner avec des produits locaux et de saison'),
            t('Réduire la consommation de viande'),
            t("Préférer l'eau du robinet"),
          ],
        },
        [gesturesKeysForTranslation.clothing]: {
          imageSrc: '/images/illustrations/empreinte-textile.svg',
          imageAlt: t(
            "Une fille dans un magasin hésitant entre un pull en coton et un pull en lin, illustrant le fait de réduire l'utilisation d'eau des vêtements"
          ),
          gestureList: [
            t('Opter pour des vêtements durables'),
            t(
              'Privilégier les matériaux durables (lin, chanvre, laine, et si coton : recyclé)'
            ),
            t("Privilégier les produits d'occasion"),
          ],
        },
      }}
    />
  )
}
