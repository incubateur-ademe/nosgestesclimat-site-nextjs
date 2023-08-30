import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { NGCRules } from '@/types/model'
import Fuse from 'fuse.js'
import { utils } from 'publicodes'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import RuleListItem from './RuleListIem'

export type SearchItem = {
  title: string
  dottedName: string
  espace: Array<string>
}

export type Matches = Array<{
  key: string
  value: string
  indices: Array<[number, number]>
}>

const searchWeights = [
  {
    name: 'espace',
    weight: 0.6,
  },
  {
    name: 'title',
    weight: 0.4,
  },
]

export default function SearchBar({ rules }: { rules: NGCRules }) {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Fuse.FuseResult<SearchItem>[]>([])

  const rulesList: any[] = Object.entries(rules).map(([dottedName, rule]) => ({
    ...rule,
    dottedName,
  }))

  const searchIndex: Array<SearchItem> = useMemo(
    () =>
      Object.values(rulesList)
        .filter(utils.ruleWithDedicatedDocumentationPage)
        .map((rule) => ({
          title:
            getRuleTitle(rule as any) +
            (rule.acronyme ? ` (${rule.acronyme})` : ''),
          dottedName: rule.dottedName,
          espace: rule.dottedName.split(' . ').reverse(),
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rules]
  )

  const fuseSearchRef = useRef(
    () =>
      new Fuse(searchIndex, {
        keys: searchWeights,
        includeMatches: true,
        minMatchCharLength: 2,
        useExtendedSearch: true,
        distance: 50,
        threshold: 0.3,
      })
  )

  useEffect(() => {
    if (input.length < 3) return

    const fuse = fuseSearchRef.current()

    const results = [...fuse.search(input + '|' + input.replace(/ /g, '|'))]

    setResults(results)
  }, [searchIndex, input])

  const { t } = useTranslation()

  return (
    <>
      <Card className="!bg-primaryLight flex-col my-8">
        <h2 className="text-xl">
          <span
            role="img"
            aria-label="emoji search"
            aria-hidden
            className="inline-block mr-3 ">
            🔍
          </span>
          <TransClient>Explorez nos modèles</TransClient>
        </h2>

        <label
          title={t('Entrez des mots clefs')}
          className="py-2 flex items-center">
          <input
            type="search"
            value={input}
            placeholder={t('Entrez des mots-clefs de recherche')}
            className="p-4 rounded-md border border-solid border-primaryLight w-full"
            onChange={(e) => {
              const input = e.target.value

              setInput(input)
            }}
          />
        </label>

        {input.length > 2 && !results.length && (
          <div role="status" className="p-2 rounded-sm mt-2">
            <Trans i18nKey="noresults">
              Aucun résultat ne correspond à cette recherche
            </Trans>
          </div>
        )}
      </Card>

      {input.length > 2 && (
        <ul className="px-4 m-0 list-none bg-white rounded-md">
          {results.map(({ item, matches }) => (
            <RuleListItem
              key={item.dottedName}
              item={item}
              matches={matches as Matches}
              rules={rules}
            />
          ))}
        </ul>
      )}
    </>
  )
}
