import MotivationSection from '@/components/landing-pages/MotivationSection'
import TransServer from '@/components/translation/trans/TransServer'
import Image from 'next/image'

export default function MotivationSectionWaterFootprint({
  locale,
}: {
  locale: string
}) {
  return (
    <MotivationSection
      title={
        <TransServer locale={locale}>
          Économiser l’eau, un enjeu de développement durable
        </TransServer>
      }
      description={
        <p className="mb-0">
          <TransServer locale={locale}>
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
          </TransServer>
        </p>
      }
      motivationItems={[
        {
          title: (
            <TransServer locale={locale}>
              Ressources en eau douce limitées
            </TransServer>
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
            <TransServer locale={locale}>
              Bien que l’eau soit abondante sur Terre, seule 1 % de l’eau est
              douce et accessible pour la consommation humaine.
            </TransServer>
          ),
        },
        {
          title: <TransServer locale={locale}>Pollution des eaux</TransServer>,
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-pollution.svg"
              alt=""
            />
          ),
          description: (
            <TransServer locale={locale}>
              Les pratiques agricoles intensives et les rejets industriels
              contaminent les ressources en eau, menacent les écosystèmes et
              notre santé.
            </TransServer>
          ),
        },
        {
          title: <TransServer locale={locale}>Accès à l'eau</TransServer>,
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/icone-robinet.svg"
              alt=""
            />
          ),
          description: (
            <TransServer locale={locale}>
              Les activités humaines perturbent le cycle de l’eau et
              compromettent l’accès à l’eau potable, entraînant conflits, perte
              de biodiversité et déplacements de populations.
            </TransServer>
          ),
        },
      ]}
    />
  )
}
