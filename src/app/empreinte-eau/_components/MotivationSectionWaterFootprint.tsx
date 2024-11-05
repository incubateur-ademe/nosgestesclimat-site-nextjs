import MotivationSection from '@/components/landing-pages/MotivationSection'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default function MotivationSectionWaterFootprint() {
  return (
    <MotivationSection
      title={<Trans>Économiser l’eau, un enjeu de développement durable</Trans>}
      description={
        <p className="mb-0">
          <Trans>
            Avec les pressions croissantes exercées par les activités humaines
            et le changement climatique, la gestion durable de l’eau est devenue{' '}
            <strong className="text-primary-600">un défi planétaire</strong>.
            Que ce soit pour l’agriculture, l’industrie ou l’usage domestique,
            cette ressource limitée fait face à des menaces importantes.{' '}
            <strong className="text-primary-600">
              Réduire notre consommation d’eau
            </strong>{' '}
            et adopter des pratiques responsables est donc{' '}
            <strong className="text-primary-600">
              nécessaire pour préserver les ressources
            </strong>{' '}
            et répondre aux défis environnementaux mondiaux.
          </Trans>
        </p>
      }
      motivationItems={[
        {
          title: <Trans>Ressources en eau douce limitées</Trans>,
          icon: (
            <Image width={50} height={50} src="/images/icons/pipe.svg" alt="" />
          ),
          description: (
            <Trans>
              Bien que l’eau soit abondante sur Terre, seule 1 % de l’eau est
              douce et accessible pour la consommation humaine.
            </Trans>
          ),
        },
        {
          title: <Trans>Pollution des eaux</Trans>,
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/waves.svg"
              alt=""
            />
          ),
          description: (
            <Trans>
              Les pratiques agricoles intensives et les rejets industriels
              contaminent les ressources en eau, menacent les écosystèmes et
              notre santé.
            </Trans>
          ),
        },
        {
          title: <Trans>Accès à l'eau</Trans>,
          icon: (
            <Image width={50} height={50} src="/images/icons/tap.svg" alt="" />
          ),
          description: (
            <Trans>
              Les activités humaines perturbent le cycle de l’eau et
              compromettent l’accès à l’eau potable, entraînant conflits, perte
              de biodiversité et déplacements de populations.
            </Trans>
          ),
        },
      ]}
    />
  )
}
