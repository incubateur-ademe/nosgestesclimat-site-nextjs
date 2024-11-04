import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default function WhatDoWeMeasureCarbon() {
  return (
    <WhatDoWeMeasure
      title={<Trans>Calculer son empreinte carbone</Trans>}
      description={
        <p className="text-center">
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
            <Image
              width={50}
              height={50}
              src="/images/icons/electricity.svg"
              alt=""
            />
          ),
          title: (
            <Trans>
              Vos modes de déplacement (voiture, vélo, train, ferry, avion...).
            </Trans>
          ),
        },
        {
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/sheep.svg"
              alt=""
            />
          ),
          title: (
            <Trans>
              Votre régime alimentaire (viande rouge, volaille, poisson...)
            </Trans>
          ),
        },
        {
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/electricity.svg"
              alt=""
            />
          ),
          title: (
            <Trans>
              Vos consommations énergétiques (chauffage, électricité).
            </Trans>
          ),
        },

        {
          icon: (
            <Image
              width={50}
              height={50}
              src="/images/icons/computer.svg"
              alt=""
            />
          ),
          title: <Trans>Vos achats (équipements, vêtements, loisirs).</Trans>,
        },
      ]}
    />
  )
}
