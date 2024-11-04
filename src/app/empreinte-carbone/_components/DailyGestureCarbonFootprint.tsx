import DailyGestures from '@/components/landing-pages/DailyGestures'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function DailyGestureCarbonFootprint() {
  const { t } = await getServerTranslation()
  const gesturesKeysForTranslation = [
    t('Transport'),
    t('Alimentation'),
    t('Logement'),
    t('Consommation'),
  ]

  return (
    <DailyGestures
      title={
        <Trans>
          Les gestes du quotidien pour préserver nos ressources en eau
        </Trans>
      }
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
                réduire vos émissions de CO2
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
        [gesturesKeysForTranslation[0]]: {
          imageSrc: '/images/illustrations/mother-and-son-on-bike.svg',
          gestureList: [
            t('Cuisiner avec des produits locaux et de saison'),
            t('Réduire la consommation de viande'),
            t("Préférer l'eau du robinet"),
          ],
        },
        [gesturesKeysForTranslation[1]]: {
          imageSrc: '/images/illustrations/girl-cooking.svg',
          gestureList: [
            t('Cuisiner avec des produits locaux et de saison'),
            t('Réduire la consommation de viande'),
            t("Préférer l'eau du robinet"),
          ],
        },
        [gesturesKeysForTranslation[2]]: {
          imageSrc: '/images/illustrations/girl-reading-newspaper.svg',
          gestureList: [
            t('Opter pour des vêtements durables'),
            t(
              'Privilégier les matériaux durables (lin, chanvre, laine, et si coton : recyclé'
            ),
            t("Privilégier les produits d'occasion"),
          ],
        },
      }}
    />
  )
}
