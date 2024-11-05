import DailyGestures from '@/components/landing-pages/DailyGestures'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

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
            </Trans>
          </p>

          <p className="font-bold text-secondary-700">
            <Trans>Voici quelques idées :</Trans>
          </p>
        </>
      }
      gestures={{
        [gesturesKeysForTranslation.transport]: {
          imageSrc: '/images/illustrations/mother-and-son-on-bike.svg',
          gestureList: [
            t('Privilégier les transports en commun, si possible'),
            t('Éviter les trajets en avion'),
            t('Privilégier les mobilités douces'),
          ],
        },
        [gesturesKeysForTranslation.alimentation]: {
          imageSrc: '/images/illustrations/girl-cooking.svg',
          gestureList: [
            t('Cuisiner avec des produits locaux et de saison'),
            t('Réduire la consommation de viande'),
            t("Préférer l'eau du robinet"),
          ],
        },
        [gesturesKeysForTranslation.logement]: {
          imageSrc: '/images/illustrations/girl-reading-newspaper.svg',
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
          imageSrc: '/images/illustrations/girl-thinking.svg',
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
