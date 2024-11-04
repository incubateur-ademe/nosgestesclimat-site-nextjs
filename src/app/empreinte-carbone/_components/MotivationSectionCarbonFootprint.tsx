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
            <Image width={50} height={50} src="/images/icons/pipe.svg" alt="" />
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
            <Image
              width={50}
              height={50}
              src="/images/icons/waves.svg"
              alt=""
            />
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
            <Image width={50} height={50} src="/images/icons/tap.svg" alt="" />
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
