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
                src="/images/icons/icone-velo.svg"
                alt=""
              />
            </div>
          ),
          title: <Trans>Vos modes de déplacement</Trans>,
        },
        {
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/icone-viande.svg"
                alt=""
              />
            </div>
          ),
          title: <Trans>Votre régime alimentaire</Trans>,
        },
        {
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/icone-bois.svg"
                alt=""
              />
            </div>
          ),
          title: <Trans>Vos consommations énergétiques</Trans>,
        },

        {
          icon: (
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                width={48}
                height={48}
                src="/images/icons/icone-ordinateur.svg"
                alt=""
              />
            </div>
          ),
          title: <Trans>Vos achats</Trans>,
        },
      ]}
    />
  )
}
