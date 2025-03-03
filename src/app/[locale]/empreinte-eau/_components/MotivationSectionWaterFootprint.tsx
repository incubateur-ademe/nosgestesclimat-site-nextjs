import MotivationSection from '@/components/landing-pages/MotivationSection'
import Trans from '@/components/translation/trans/TransServer'
import Image from 'next/image'

export default function MotivationSectionWaterFootprint({
  locale,
}: {
  locale: string
}) {
  return (
    <MotivationSection
      title={
        <Trans locale={locale}>
          Économiser l’eau, un enjeu de développement durable
        </Trans>
      }
      description={
        <p className="mb-0">
          <Trans locale={locale}>
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
          title: (
            <Trans locale={locale}>Ressources en eau douce limitées</Trans>
          ),
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-eau.svg"
              alt=""
            />
          ),
          description: (
            <Trans locale={locale}>
              Bien que l’eau soit abondante sur Terre, seule 1 % de l’eau est
              douce et accessible pour la consommation humaine.
            </Trans>
          ),
        },
        {
          title: <Trans locale={locale}>Pollution des eaux</Trans>,
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-pollution.svg"
              alt=""
            />
          ),
          description: (
            <Trans locale={locale}>
              Les pratiques agricoles intensives et les rejets industriels
              contaminent les ressources en eau, menacent les écosystèmes et
              notre santé.
            </Trans>
          ),
        },
        {
          title: <Trans locale={locale}>Accès à l'eau</Trans>,
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-robinet.svg"
              alt=""
            />
          ),
          description: (
            <Trans locale={locale}>
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
