import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'

export default function Modele() {
  return (
    <div className="relative bg-primary-50 py-20 pt-16">
      <h2 className="mb-12 text-center text-3xl">
        <Trans>Un modèle de calcul fiable</Trans>
      </h2>
      <div className="space-between mx-auto flex max-w-5xl gap-8">
        <div>
          <Title tag="h3" className="text-2xl">
            <Trans>Basé sur les données de l’ADEME</Trans>
          </Title>
          <p className="text-lg">
            <Trans>
              Retrouvez toute l’expertise de{' '}
              <strong className="text-primary-700">
                l’Agence de l’Environnement et de la Maîtrise de l’Énergie
              </strong>{' '}
              dans le calculateur de Nos Gestes Climat : données, perspectives,
              leviers d’action.
            </Trans>
          </p>
          <Link href="/documentation">
            <Trans>Découvrir la documentation</Trans>
          </Link>
        </div>
        <div>
          <Title tag="h3" className="text-2xl">
            <Trans>Un calculateur libre et documenté</Trans>
          </Title>
          <p className="text-lg">
            <Trans>
              Les lignes de code, les données et même une grande partie des
              réflexions méthodologiques derrière le calculateur sont toutes{' '}
              <strong className="text-primary-700">accessibles,</strong> ce qui
              permet à qui veut de{' '}
              <strong className="text-primary-700">
                contribuer et améliorer l’outil.
              </strong>
            </Trans>
          </p>
          <Link href="/nouveautes">
            <Trans>Voir les nouveautés</Trans>
          </Link>
        </div>
      </div>
    </div>
  )
}
