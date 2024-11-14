import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default function WhatDoWeMeasureCarbon() {
  return (
    <WhatDoWeMeasure
      title={<Trans>Calculer son empreinte carbone</Trans>}
      description={
        <p className="mb-0 text-center">
          <Trans>
            Le calculateur carbone permet de comprendre quels sont nos usages
            qui contribuent le plus au changement climatique et de saisir{' '}
            <strong className="text-primary-600">
              les actions qui auraient le plus d’impact
            </strong>{' '}
            pour le réduire.
          </Trans>
        </p>
      }
      shouldDescriptionBeBeforeList
      shouldUseDescriptionMaxWidth
      listItems={[
        {
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/bike.svg"
                alt=""
              />
            </div>
          ),
          title: (
            <Trans>
              Vos modes de déplacement (voiture, vélo, train, ferry, avion...).
            </Trans>
          ),
        },
        {
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/meat.svg"
                alt=""
              />
            </div>
          ),
          title: (
            <Trans>
              Votre régime alimentaire (viande rouge, volaille, poisson...)
            </Trans>
          ),
        },
        {
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/wood.svg"
                alt=""
              />
            </div>
          ),
          title: (
            <Trans>
              Vos consommations énergétiques (chauffage, électricité).
            </Trans>
          ),
        },

        {
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/computer.svg"
                alt=""
              />
            </div>
          ),
          title: <Trans>Vos achats (équipements, vêtements, loisirs).</Trans>,
        },
      ]}
    />
  )
}
