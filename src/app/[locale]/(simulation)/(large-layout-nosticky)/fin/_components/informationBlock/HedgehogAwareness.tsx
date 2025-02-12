'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'

export default function HedgehogAwareness() {
  return (
    <>
      <Title
        tag="h2"
        className="text-lg lg:text-2xl"
        title={
          <TransClient>
            <strong className="text-secondary-700 font-black">Hérissons</strong>{' '}
            en danger ?
          </TransClient>
        }
      />
      <p>
        <TransClient>
          Les hérissons sont menacé⋅e⋅s par le changement climatique et la perte
          de biodiversité. L'augmentation des températures et les conditions
          climatiques extrêmes perturbent leur habitat naturel, rendant
          difficile la recherche de nourriture et la reproduction.
        </TransClient>
      </p>
      <p>
        <TransClient>
          De plus, la disparition de leur environnement naturel, due à la
          déforestation et à l'urbanisation, réduit leurs zones de vie
          potentielles, augmentant ainsi leur vulnérabilité face aux prédateurs
          et aux maladies.
        </TransClient>
      </p>
      <div className="flex justify-end">
        <Link
          className="text-sm"
          target="_blank"
          href="https://information.tv5monde.com/international/france-les-herissons-en-danger-dextinction-708196">
          <TransClient>En savoir plus</TransClient>
        </Link>
      </div>
    </>
  )
}
