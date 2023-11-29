'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'

import Link from '@/components/Link'
import DocumentationLandingCard from './DocumentationLandingCard'
import SearchBar from './SearchBar'

// We want to be able to define an order for the cards
const FIXED_CARD_DOTTEDNAMES = [
  'bilan',
  'services sociétaux',
  'alimentation . plats',
  'logement . chauffage . empreinte par défaut',
  'transport . voiture',
  'transport . mobilité douce',
]

export default function DocumentationLanding() {
  const locale = useLocale()

  const {
    user: { region },
  } = useUser()

  const { data: rules } = useRules({
    lang: locale,
    region: region?.code ?? 'FR',
  })

  if (!rules) return null

  return (
    <div>
      <Title title={<Trans>Documentation</Trans>} />

      <p>
        <Trans i18nKey={'meta.publicodes.pages.Documentation.intro'}>
          Le simulateur Nos Gestes Climat est basé sur le modèle de calcul du
          même nom, composé d'un ensemble de briques. Sur cette documentation,
          vous avez accès en toute transparence à l'ensemble des variables du
          calcul.
        </Trans>
      </p>

      <div>
        <Link href="/modele">
          💡 <Trans> En savoir plus sur notre modèle</Trans>
        </Link>
      </div>

      <SearchBar rules={rules} />

      <h2 className="mt-4 text-xl">
        <Trans>Quelques suggestions </Trans>
      </h2>

      <ul className="grid max-w-[60rem] grid-cols-1 flex-wrap gap-2 p-0 sm:grid-cols-2 md:grid-cols-3">
        {FIXED_CARD_DOTTEDNAMES.map((dottedName) => {
          return (
            <li key={dottedName}>
              <DocumentationLandingCard
                dottedName={dottedName}
                rule={rules[dottedName]}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
