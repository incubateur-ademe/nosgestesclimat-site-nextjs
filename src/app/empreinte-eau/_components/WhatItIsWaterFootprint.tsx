import WhatItIs from '@/components/landing-pages/WhatItIs'
import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default async function WhatItIsWaterFootprint() {
  return (
    <WhatItIs
      title={<Trans>Qu'est-ce que l'empreinte eau ?</Trans>}
      description={
        <section>
          <p>
            <Trans>
              <strong className="text-primary-600">L’empreinte eau</strong>{' '}
              correspond à l’ensemble de l’eau douce utilisée pour produire,
              distribuer et traiter en fin de vie des produits, biens ou
              services, que nous consommons au quotidien.
            </Trans>
          </p>

          <p>
            <Trans>
              Cette consommation d’eau, pourtant très importante, est{' '}
              <strong className="text-primary-600">invisible à l’œil nu</strong>{' '}
              mais son impact est bien réel.
            </Trans>
          </p>
          <p>
            <Trans>
              Empreinte eau et{' '}
              <Link className="font-bold" href="/empreinte-carbone">
                empreinte carbone
              </Link>{' '}
              sont complémentaires, et les comprendre permet d’agir en faveur
              d’une gestion{' '}
              <strong className="text-primary-600">
                plus durable des ressources naturelles
              </strong>{' '}
              de la planète.
            </Trans>
          </p>
        </section>
      }
      illustration={
        <Image
          width={500}
          height={500}
          src="/images/illustrations/people-with-paperboard.png"
          alt=""
        />
      }
    />
  )
}
