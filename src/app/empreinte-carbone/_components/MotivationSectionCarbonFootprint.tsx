import MotivationSection from '@/components/landing-pages/MotivationSection'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default async function MotivationSectionCarbonFootprint() {
  return (
    <MotivationSection
      title={<Trans>Accélérons la transition écologique</Trans>}
      description={
        <p className="mb-0">
          <Trans>
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
          title: <Trans>Passer le test</Trans>,
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={32}
                height={32}
                src="/images/icons/calculator.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <Trans>
              Évaluer son empreinte écologique (carbone et eau) pour identifier
              les principaux leviers d’action.
            </Trans>
          ),
        },
        {
          title: <Trans>Agir au quotidien</Trans>,
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={32}
                height={32}
                src="/images/icons/bicep.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <Trans>
              Découvrir quelles actions ont le plus d’impact pour réduire son
              empreinte carbone.
            </Trans>
          ),
        },
        {
          title: <Trans>S'engager collectivement</Trans>,
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/handshake.svg"
                alt=""
              />
            </div>
          ),
          description: (
            <Trans>
              Les challenges entre amis ou la diffusion des outils en entreprise
              permettent de mobiliser votre entourage.
            </Trans>
          ),
        },
      ]}
    />
  )
}
