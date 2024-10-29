import DailyGestures from '@/components/landing-pages/DailyGestures'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default async function DailyGestureWaterFootprint() {
  return (
    <DailyGestures
      title={
        <Trans>
          Les gestes du quotidien pour préserver nos ressources en eau Les
          gestes du quotidien pour préserver nos ressources en eau{' '}
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
                au-delà de ce que nous voyons à la maison
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
        Alimentation: [
          <Trans key="cuisiner">
            Cuisiner avec des produits locaux et de saison
          </Trans>,
          <Trans key="viande">Réduire la consommation de viande</Trans>,
          <Trans key="eau-du-robinet">Préférer l'eau du robinet</Trans>,
        ],
        Vêtements: [
          <Trans key="textile-durables">
            Opter pour des vêtements durables
          </Trans>,
          <Trans key="fabric">
            Privilégier les matériaux durables (lin, chanvre, laine, et si coton
            : recyclé)
          </Trans>,
          <Trans key="second-hand">Privilégier les produits d'occasion</Trans>,
        ],
      }}
      illustration={
        <Image
          width={300}
          height={300}
          src="/images/illustrations/girl-cooking.png"
          alt=""
        />
      }
    />
  )
}
