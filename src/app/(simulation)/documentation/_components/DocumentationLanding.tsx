'use client'

import TransClient from '@/components/translation/TransClient'
import Title from '@/design-system/layout/Title'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'
import { utils } from 'publicodes'

import Card from '@/design-system/layout/Card'
import { NGCRules } from '@/types/model'
import editorialisedModels from '../_data/editorialisedModels.yaml'
import SearchBar from './SearchBar'

export default function DocumentationLanding() {
  const locale = useLocale()

  const {
    user: { region },
  } = useUser()

  const { data } = useRules({
    lang: locale || 'fr',
    region: region?.code || 'FR',
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
      <Title title={<TransClient>Documentation</TransClient>} />

      <p>
        <TransClient i18nKey={'meta.publicodes.pages.Documentation.intro'}>
          Le simulateur Nos Gestes Climat est basé sur le modèle de calcul du
          même nom, composé d'un ensemble de briques. Sur cette documentation,
          vous avez accès en toute transparence à l'ensemble des variables du
          calcul.
        </TransClient>
      </p>

      <div>
        <Link href="/modele">
          💡 <TransClient> En savoir plus sur notre modèle</TransClient>
        </Link>
      </div>

      <SearchBar rules={rules} />

      <h2 className="mt-4 text-xl">
        <TransClient>Quelques suggestions </TransClient>
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap max-w-[60rem] p-0 gap-2">
        {editos.map(({ dottedName, résumé }) => {
          return (
            <li key={dottedName}>
              <Card
                tag={Link}
                style={{ backgroundColor: getColor(dottedName) || '#5758BB' }}
                href={'/documentation/' + utils.encodeRuleName(dottedName)}
                className="h-[12rem] flex-auto relative text-white no-underline">
                {résumé && (
                  <h2 className="text-base text-white">
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
