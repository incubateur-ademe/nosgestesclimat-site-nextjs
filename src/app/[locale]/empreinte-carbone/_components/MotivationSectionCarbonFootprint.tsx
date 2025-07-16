import MotivationSection from '@/components/landing-pages/MotivationSection'

export default function MotivationSectionCarbonFootprint({
  locale,
}: {
  locale: string
}) {
  return (
    <MotivationSection
      title="Accélérons la transition écologique"
      description="<p class='mb-0'>Il est urgent de réduire nos émissions de gaz à effet de serre et d'opérer une transition vers des modes de vie bas-carbone. Individus et organisations, il est temps d'agir : <strong class='text-primary-600'>mesurer son empreinte carbone est la première étape !</strong></p>"
      motivationItems={[
        {
          title: 'Passer le test',
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_calculatrice_e37c20a6b4.svg',
            alternativeText: '',
          },
          description:
            "Évaluer son empreinte écologique (carbone et eau) pour identifier les principaux leviers d'action.",
        },
        {
          title: 'Agir au quotidien',
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_biceps_9065e62d79.svg',
            alternativeText: '',
          },
          description:
            "Découvrir quelles actions ont le plus d'impact pour réduire son empreinte carbone.",
        },
        {
          title: "S'engager collectivement",
          icon: {
            url: 'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_poignee_de_main_1bd31b7009.svg',
            alternativeText: '',
          },
          description:
            'Les challenges entre amis ou la diffusion des outils en entreprise permettent de mobiliser votre entourage.',
        },
      ]}
    />
  )
}
