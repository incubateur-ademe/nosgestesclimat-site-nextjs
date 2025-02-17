import WhatDoWeMeasure from '@/components/landing-pages/WhatDoWeMeasure'
import TransServer from '@/components/translation/trans/TransServer'
import Image from 'next/image'

export default function WhatDoWeMeasureCarbon({ locale }: { locale: string }) {
  return (
    <WhatDoWeMeasure
      title={
        <TransServer locale={locale}>
          Calculer son empreinte carbone
        </TransServer>
      }
      description={
        <p className="mb-0 text-center">
          <TransServer locale={locale}>
            Le calculateur carbone permet de comprendre quels sont nos usages
            qui contribuent le plus au changement climatique et de saisir{' '}
            <strong className="text-primary-600">
              les actions qui auraient le plus d’impact
            </strong>{' '}
            pour le réduire.
          </TransServer>
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
          title: (
            <TransServer locale={locale}>Vos modes de déplacement</TransServer>
          ),
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
          title: (
            <TransServer locale={locale}>Votre régime alimentaire</TransServer>
          ),
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
          title: (
            <TransServer locale={locale}>
              Vos consommations énergétiques
            </TransServer>
          ),
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
          title: <TransServer locale={locale}>Vos achats</TransServer>,
        },
      ]}
    />
  )
}
