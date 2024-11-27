import MotivationSection from '@/components/landing-pages/MotivationSection'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function CollectivelyCommit() {
  const { t } = await getServerTranslation()

  return (
    <MotivationSection
      title={
        <Trans>S’engager collectivement autour des enjeux du climat</Trans>
      }
      description={
        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-sm md:text-lg">
            <Trans>
              Chez Nos Gestes Climat, nous croyons au pouvoir de{' '}
              <strong className="text-primary-600">l’action collective</strong>{' '}
              pour relever les défis environnementaux. Notre mission est de{' '}
              <strong className="text-primary-600">sensibiliser</strong> et
              d’accompagner chacun, citoyens, entreprises et collectivités, à
              mieux comprendre son empreinte écologique, carbone ou eau,{' '}
              <strong className="text-primary-600">
                identifier les gestes
              </strong>{' '}
              pour la réduire et{' '}
              <strong className="text-primary-600">
                entraîner leur entourage
              </strong>{' '}
              dans ce mouvement.
            </Trans>
          </p>
          <p className="text-center text-sm font-bold text-secondary-700 md:text-lg">
            <Trans>
              Accélérons l’impact collectif avec Nos Gestes Climat !
            </Trans>
          </p>

          <Image
            src="/images/illustrations/engagement-collectif-pour-le-climat.svg"
            alt={t(
              "Un groupe de personnes en conférence, illustrant l'engagement collectif pour le climat"
            )}
            width={600}
            height={600}
          />
        </div>
      }
    />
  )
}
