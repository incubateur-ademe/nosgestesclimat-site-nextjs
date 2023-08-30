'use client'

import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import Link from 'next/link'
import { utils } from 'publicodes'

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

  const rules = data as { [key: string]: { couleur: string; résumé: string } }

  const editos = (editorialisedModels as unknown as string[]).map(
    (dottedName: string) => ({
      ...rules[dottedName],
      dottedName,
    })
  )

  const getColor = (dottedName: string) =>
    rules[dottedName.split(' . ')[0]].couleur

  return (
    <div className="ui__ container">
      <Title title={<TransClient>Documentation</TransClient>} />

      <p>
        <TransClient i18nKey={'meta.publicodes.pages.Documentation.intro'}>
          Le simulateur Nos Gestes Climat est basé sur le modèle de calcul du
          même nom, composé d'un ensemble de briques. Sur cette documentation,
          vous avez accès en toute transparence à l'ensemble des variables du
          calcul.
        </TransClient>
      </p>

      <p>
        <Link href="/modele">
          💡 <TransClient> En savoir plus sur notre modèle</TransClient>
        </Link>
      </p>

      <h2>
        <TransClient>Explorez nos modèles</TransClient>
      </h2>

      <SearchBar rules={rules} />

      <h2>
        <TransClient>Quelques suggestions </TransClient>
      </h2>

      <ol className="flex justify-start items-center flex-wrap max-w-[60rem] p-0">
        {editos.map(({ dottedName, résumé }) => {
          const bgClassName = `bg-${getColor(dottedName) || 'primary'}`

          return (
            <Card
              tag="li"
              key={dottedName}
              className={`h-[12rem] w-[11rem] flex-auto ${bgClassName}`}>
              <Link href={'/documentation/' + utils.encodeRuleName(dottedName)}>
                <span className="absolute top-1/2 left-1/2 -translate-1/2 whitespace-nowrap opacity-20">
                  <Image
                    src={`/images/model/${dottedName}.svg`}
                    width="100"
                    height="100"
                    alt=""
                  />
                </span>

                {résumé && <h2>{<Markdown>{résumé}</Markdown>}</h2>}
              </Link>
            </Card>
          )
        })}
      </ol>
    </div>
  )
}
