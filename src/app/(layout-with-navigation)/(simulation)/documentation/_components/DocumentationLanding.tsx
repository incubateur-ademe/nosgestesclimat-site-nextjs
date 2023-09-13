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
        {editos.map(({ dottedName, résumé }) => {
          return (
            <li key={dottedName}>
              <Card
                tag={Link}
                style={{ backgroundColor: getColor(dottedName) || '#5758BB' }}
                href={'/documentation/' + utils.encodeRuleName(dottedName)}
                className="relative h-[12rem] flex-auto text-white no-underline">
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
