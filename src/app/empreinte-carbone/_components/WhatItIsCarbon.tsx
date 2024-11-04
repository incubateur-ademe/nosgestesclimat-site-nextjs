import WhatItIs from '@/components/landing-pages/WhatItIs'
import Trans from '@/components/translation/Trans'
import Image from 'next/image'

export default function WhatItIsCarbon() {
  return (
    <WhatItIs
      title={<Trans>Qu’est-ce que l’empreinte carbone ?</Trans>}
      description={
        <div>
          <p>
            <Trans>
              <strong className="text-primary-600">L’empreinte carbone</strong>{' '}
              mesure la quantité totale de gaz à effet de serre (GES) émis par
              nos activités sur une année.
            </Trans>
          </p>
          <p>
            <Trans>
              Depuis le siècle dernier,{' '}
              <strong className="text-primary-600">
                la concentration du carbone dans l’atmosphère augmente
              </strong>
              , si bien que le climat subit de graves bouleversements : montée
              des eaux, destruction du vivant, augmentation des températures,
              etc.
            </Trans>
          </p>
          <p>
            <Trans>
              Le consensus scientifique est formel,{' '}
              <strong className="text-primary-600">
                cette augmentation est directement liée aux activités humaines
              </strong>
              . Il est temps de réduire ou de remplacer ces activités émettrices
              !
            </Trans>
          </p>
        </div>
      }
      illustration={
        <Image
          width={500}
          height={500}
          src="/images/illustrations/girl-thinking.svg"
          alt=""
        />
      }
    />
  )
}
