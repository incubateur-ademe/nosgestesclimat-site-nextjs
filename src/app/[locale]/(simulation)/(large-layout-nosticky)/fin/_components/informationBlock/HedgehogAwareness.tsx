import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'

export default function HedgehogAwareness() {
  return (
    <>
      <Title
        tag="h2"
        className="text-lg lg:text-2xl"
        title={
          <Trans locale={locale}>
            <strong className="text-secondary-700 font-black">Hérissons</strong>{' '}
            en danger ?
          </Trans>
        }
      />
      <p>
        <Trans locale={locale}>
          Les hérissons sont menacé⋅e⋅s par le changement climatique et la perte
          de biodiversité. L'augmentation des températures et les conditions
          climatiques extrêmes perturbent leur habitat naturel, rendant
          difficile la recherche de nourriture et la reproduction.
        </Trans>
      </p>
      <p>
        <Trans locale={locale}>
          De plus, la disparition de leur environnement naturel, due à la
          déforestation et à l'urbanisation, réduit leurs zones de vie
          potentielles, augmentant ainsi leur vulnérabilité face aux prédateurs
          et aux maladies.
        </Trans>
      </p>
      <div className="flex justify-end">
        <Link
          className="text-sm"
          target="_blank"
          href="https://information.tv5monde.com/international/france-les-herissons-en-danger-dextinction-708196">
          <Trans locale={locale}>En savoir plus</Trans>
        </Link>
      </div>
    </>
  )
}
