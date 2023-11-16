'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import Markdown from 'markdown-to-jsx'
import { utils } from 'publicodes'

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { NGCRules } from '@/publicodes-state/types'
import editorialisedModels from '../_data/editorialisedModels.yaml'
import SearchBar from './SearchBar'

const EMOJIS = ['👤', '🏛️', '🍽️', '🌡️', '🚗', '🗑️']

export default function DocumentationLanding() {
  const locale = useLocale()

  const {
    user: { region },
  } = useUser()

  const { data } = useRules({
    lang: locale,
    region: region?.code ?? 'FR',
  })

  if (!data) return null

  const rules = data as NGCRules & {
    [key: string]: { couleur: string; résumé: string }
  }

  const editos = (editorialisedModels as unknown as string[]).map(
    (dottedName: string) => ({
      ...rules[dottedName],
      dottedName,
    })
  )

  const getColor = (dottedName: string) =>
    rules[dottedName.split(' . ')[0]].couleur

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
        {editos.map(({ dottedName, résumé }, index) => {
          return (
            <li key={dottedName}>
              <Card
                tag={Link}
                style={{ backgroundColor: getColor(dottedName) || '#5758BB' }}
                href={'/documentation/' + utils.encodeRuleName(dottedName)}
                className="relative !flex h-[12rem] flex-auto justify-center text-center text-base text-white no-underline">
                <p className="-z-1 absolute bottom-0 left-0 right-0 top-0 text-center align-middle text-[8.5rem] opacity-20 grayscale">
                  <Emoji className="inline-block">{EMOJIS[index]}</Emoji>
                </p>
                {résumé && (
                  <h2 className="z-10 mb-0 text-base text-white">
                    {<Markdown>{résumé}</Markdown>}
                  </h2>
                )}
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
