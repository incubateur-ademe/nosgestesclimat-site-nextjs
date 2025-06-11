import MotivationSection from '@/components/landing-pages/MotivationSection'
import Trans from '@/components/translation/trans/TransServer'
import Image from 'next/image'

export default function MotivationSectionCarbonFootprint({
  locale,
}: {
  locale: string
}) {
  return (
    <MotivationSection
      title={<Trans locale={locale}>Accélérons la transition écologique</Trans>}
      description={
        <p className="mb-0">
          <Trans locale={locale}>
            Il est urgent de réduire nos émissions de gaz à effet de serre et
            d’opérer une transition vers des modes de vie bas-carbone. Individus
            et organisations, il est temps d’agir :{' '}
            <strong className="text-primary-600">
              mesurer son empreinte carbone est la première étape !
            </strong>
          </Trans>
        </p>
      }
      motivationItems={[
        {
          title: <Trans locale={locale}>Passer le test</Trans>,
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={32}
                height={32}
                src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_calculatrice_e37c20a6b4.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <Trans locale={locale}>
              Évaluer son empreinte écologique (carbone et eau) pour identifier
              les principaux leviers d’action.
            </Trans>
          ),
        },
        {
          title: <Trans locale={locale}>Agir au quotidien</Trans>,
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={32}
                height={32}
                src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_biceps_9065e62d79.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <Trans locale={locale}>
              Découvrir quelles actions ont le plus d’impact pour réduire son
              empreinte carbone.
            </Trans>
          ),
        },
        {
          title: <Trans locale={locale}>S'engager collectivement</Trans>,
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/icone_poignee_de_main_1bd31b7009.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <Trans locale={locale}>
              Les challenges entre amis ou la diffusion des outils en entreprise
              permettent de mobiliser votre entourage.
            </Trans>
          ),
        },
      ]}
    />
  )
}
