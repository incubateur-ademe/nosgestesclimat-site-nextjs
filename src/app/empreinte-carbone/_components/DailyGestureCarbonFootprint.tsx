import DailyGestures from '@/components/landing-pages/DailyGestures'
import Trans from '@/components/translation/Trans'
import { trackingActionClickPageBottom } from '@/constants/tracking/actions'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import {
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'

export default async function DailyGestureCarbonFootprint() {
  const { t } = await getServerTranslation()

  const gesturesKeysForTranslation = {
    transport: t('Transport'),
    alimentation: t('Alimentation'),
    logement: t('Logement'),
    consommation: t('Consommation'),
  }

  return (
    <DailyGestures
      title={<Trans>Les actions pour réduire son empreinte carbone </Trans>}
      description={
        <>
          <p>
            <Trans>
              Pour un mode de vie plus durable, certaines actions{' '}
              <strong className="text-primary-600">
                ont un impact plus fort que d’autres
              </strong>
              . En intégrant ces gestes dans votre quotidien, vous pouvez
              fortement{' '}
              <strong className="text-primary-600">
                réduire vos émissions de Co2
              </strong>
              .
            </Trans>{' '}
            <Trans>Voici quelques idées :</Trans>
          </p>
        </>
      }
      trackingEvents={{
        start: getLandingClickCTAStart(
          '/empreinte-carbone',
          trackingActionClickPageBottom
        ),
        resume: getLandingClickCTAResume(
          '/empreinte-carbone',
          trackingActionClickPageBottom
        ),
        results: getLandingClickCTAResults(
          '/empreinte-carbone',
          trackingActionClickPageBottom
        ),
      }}
      gestures={{
        [gesturesKeysForTranslation.transport]: {
          imageSrc: '/images/illustrations/empreinte-carbone-velo.svg',
          imageAlt: t(
            'Une mère et son fils sur un vélo, illustrant la possibilité de réduire son empreinte carbone en privilégiant les transports doux'
          ),
          gestureList: [
            t('Privilégier les transports en commun, si possible'),
            t('Éviter les trajets en avion'),
            t('Privilégier les mobilités douces'),
          ],
        },
        [gesturesKeysForTranslation.alimentation]: {
          imageSrc:
            '/images/illustrations/empreinte-carbone-cuisine-alimentation.svg',
          imageAlt: t(
            "Une jeune femme cuisinant, illustrant l'importance de ses choix d'alimentation dans le calcul de son empreinte carbone"
          ),
          gestureList: [
            t('Cuisiner avec des produits locaux et de saison'),
            t('Réduire la consommation de viande'),
            t("Préférer l'eau du robinet"),
          ],
        },
        [gesturesKeysForTranslation.logement]: {
          imageSrc: '/images/illustrations/empreinte-carbone-logement.svg',
          imageAlt: t(
            "Une jeune femme lisant un journal, illustrant l'empreinte carbone liée à son logement"
          ),
          gestureList: [
            t(
              'Réaliser des travaux d’isolation de son logement (pour les propriétaires)'
            ),
            t(
              'Privilégier les modes de chauffage peu émetteurs de Co2 (électricité, bois, biomasse)'
            ),
          ],
        },
        [gesturesKeysForTranslation.consommation]: {
          imageSrc: '/images/illustrations/empreinte-carbone-achats.svg',
          imageAlt: t(
            "Une jeune femme réfléchissant à ses choix de consommation, illustrant l'importance de ses achats dans le calcul de son empreinte carbone"
          ),
          gestureList: [
            t("Privilégier les produits d'occasion"),
            t('Opter pour des vêtements durables'),
            t('Allonger la vie de ses appareils et des meubles'),
          ],
        },
      }}
    />
  )
}
