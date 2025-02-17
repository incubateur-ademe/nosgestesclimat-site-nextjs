import MotivationSection from '@/components/landing-pages/MotivationSection'
import TransServer from '@/components/translation/trans/TransServer'
import Image from 'next/image'

export default async function MotivationSectionCarbonFootprint({
  locale,
}: {
  locale: string
}) {
  return (
    <MotivationSection
      title={
        <TransServer locale={locale}>
          Accélérons la transition écologique
        </TransServer>
      }
      description={
        <p className="mb-0">
          <TransServer locale={locale}>
            Il est urgent de réduire nos émissions de gaz à effet de serre et
            d’opérer une transition vers des modes de vie bas-carbone. Individus
            et organisations, il est temps d’agir :{' '}
            <strong className="text-primary-600">
              mesurer son empreinte carbone est la première étape !
            </strong>
          </TransServer>
        </p>
      }
      motivationItems={[
        {
          title: <TransServer locale={locale}>Passer le test</TransServer>,
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={32}
                height={32}
                src="/images/icons/icone-calculatrice.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <TransServer locale={locale}>
              Évaluer son empreinte écologique (carbone et eau) pour identifier
              les principaux leviers d’action.
            </TransServer>
          ),
        },
        {
          title: <TransServer locale={locale}>Agir au quotidien</TransServer>,
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={32}
                height={32}
                src="/images/icons/icone-biceps.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <TransServer locale={locale}>
              Découvrir quelles actions ont le plus d’impact pour réduire son
              empreinte carbone.
            </TransServer>
          ),
        },
        {
          title: (
            <TransServer locale={locale}>S'engager collectivement</TransServer>
          ),
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/icone-poignee-de-main.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <TransServer locale={locale}>
              Les challenges entre amis ou la diffusion des outils en entreprise
              permettent de mobiliser votre entourage.
            </TransServer>
          ),
        },
      ]}
    />
  )
}
