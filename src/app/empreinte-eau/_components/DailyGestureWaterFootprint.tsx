import DailyGestures from '@/components/landing-pages/DailyGestures'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function DailyGestureWaterFootprint() {
  const { t } = await getServerTranslation()

  const gesturesKeysForTranslation = {
    alimentation: t('Alimentation'),
    clothing: t('Vêtements'),
  }

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
              L’eau est{' '}
              <strong className="text-primary-600">au cœur de nos vies</strong>{' '}
              et de notre consommation quotidienne, bien{' '}
              <strong className="text-primary-600">
                au-delà de ce que nous observons à la maison
              </strong>
              . Chaque jour, des milliers de litres d’eau sont utilisés pour
              produire les aliments que nous mangeons, les vêtements que nous
              portons et l’énergie que nous consommons.
            </Trans>
          </p>

          <p>
            <Trans>
              Voici quelques exemples de gestes qui auront un impact important
              sur votre consommation eau indirecte :
            </Trans>
          </p>
        </>
      }
      gestures={{
        [gesturesKeysForTranslation.alimentation]: {
          imageSrc: '/images/illustrations/corn-and-avocado.svg',
          gestureList: [
            t('Cuisiner avec des produits locaux et de saison'),
            t('Réduire la consommation de viande'),
            t("Préférer l'eau du robinet"),
          ],
        },
        [gesturesKeysForTranslation.clothing]: {
          imageSrc: '/images/illustrations/girl-with-clothes.svg',
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
