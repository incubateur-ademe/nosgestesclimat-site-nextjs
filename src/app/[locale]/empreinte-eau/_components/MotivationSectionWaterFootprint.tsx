import MotivationSection from '@/components/landing-pages/MotivationSection'

export default function MotivationSectionWaterFootprint({
  locale,
}: {
  locale: string
}) {
  return (
    <MotivationSection
      title="Économiser l'eau, un enjeu de développement durable"
      description="<p class='mb-0'>Avec les pressions croissantes exercées par les activités humaines et le changement climatique, la gestion durable de l'eau est devenue <strong class='text-primary-600'>un défi planétaire</strong>. Que ce soit pour l'agriculture, l'industrie ou l'usage domestique, cette ressource limitée fait face à des menaces importantes. <strong class='text-primary-600'>Réduire notre consommation d'eau</strong> et adopter des pratiques responsables est donc <strong class='text-primary-600'>nécessaire pour préserver les ressources</strong> et répondre aux défis environnementaux mondiaux.</p>"
      motivationItems={[
        {
          title: 'Ressources en eau douce limitées',
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_eau_c22d6f0b6e.svg',
            alternativeText: '',
          },
          description:
            "Bien que l'eau soit abondante sur Terre, seule 1 % de l'eau est douce et accessible pour la consommation humaine.",
        },
        {
          title: 'Pollution des eaux',
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_pollution_338f41ac90.svg',
            alternativeText: '',
          },
          description:
            'Les pratiques agricoles intensives et les rejets industriels contaminent les ressources en eau, menacent les écosystèmes et notre santé.',
        },
        {
          title: "Accès à l'eau",
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_robinet_5ac677e900.svg',
            alternativeText: '',
          },
          description:
            "Les activités humaines perturbent le cycle de l'eau et compromettent l'accès à l'eau potable, entraînant conflits, perte de biodiversité et déplacements de populations.",
        },
      ]}
    />
  )
}
