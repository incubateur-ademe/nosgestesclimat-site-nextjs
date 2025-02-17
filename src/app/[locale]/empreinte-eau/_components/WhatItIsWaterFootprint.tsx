import WhatItIs from '@/components/landing-pages/WhatItIs'
import Link from '@/components/Link'
import TransServer from '@/components/translation/trans/TransServer'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function WhatItIsWaterFootprint({
  locale,
}: {
  locale: string
}) {
  const { t } = await getServerTranslation(locale)

  return (
    <WhatItIs
      title={
        <TransServer locale={locale}>
          Qu'est-ce que l'empreinte eau ?
        </TransServer>
      }
      description={
        <section>
          <p>
            <TransServer locale={locale}>
              <strong className="text-primary-600">L’empreinte eau</strong>{' '}
              correspond à l’ensemble de l’eau douce utilisée pour produire,
              distribuer et traiter en fin de vie des produits, biens ou
              services, que nous consommons au quotidien.
            </TransServer>
          </p>

          <p>
            <TransServer locale={locale}>
              Cette consommation d’eau, pourtant très importante, est{' '}
              <strong className="text-primary-600">invisible à l’œil nu</strong>{' '}
              mais son impact est bien réel.
            </TransServer>
          </p>
          <p className="mb-0">
            <TransServer locale={locale}>
              Empreinte eau et{' '}
              <Link
                className="text-primary-600 font-bold"
                href="/empreinte-carbone">
                empreinte carbone
              </Link>{' '}
              sont complémentaires, et les comprendre permet d’agir en faveur
              d’une gestion{' '}
              <strong className="text-primary-600">
                plus durable des ressources naturelles
              </strong>{' '}
              de la planète.
            </TransServer>
          </p>
        </section>
      }
      illustration={
        <Image
          width={500}
          height={500}
          className="px-5 md:px-0"
          src="/images/illustrations/definition-empreinte-eau.svg"
          alt={t(
            "Une balance indiquant la quantité d'eau nécessaire pour produire un ordinateur"
          )}
        />
      }
    />
  )
}
