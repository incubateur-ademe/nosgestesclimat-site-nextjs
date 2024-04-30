import SearchIcon from '@/components/icons/SearchIcon'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { DottedName } from '@/publicodes-state/types'
import { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import Fuse from 'fuse.js'
import { utils } from 'publicodes'
import { useEffect, useMemo, useRef, useState } from 'react'
import RuleListItem from './RuleListIem'

export type SearchItem = {
  title: string
  dottedName: DottedName
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

  const { t } = useClientTranslation()

  return (
    <>
      <Card className="my-8 border-none bg-primary-100">
        <h2 className="flex items-center text-xl">
          <SearchIcon className="mr-2" />

          <Trans>Explorez nos modèles</Trans>
        </h2>

        <label
          title={t('Entrez des mots clefs')}
          className="flex items-center py-2">
          {' '}
          <input
            type="search"
            value={input}
            placeholder={t('Entrez des mots-clefs de recherche')}
            className="w-full rounded-xl border border-solid border-primary-100 p-4"
            onChange={(e) => {
              const input = e.target.value

              setInput(input)
            }}
          />
        </label>

        {input.length > 2 && !results.length && (
          <div role="status" className="mt-2 rounded-sm p-2">
            <Trans i18nKey="noresults">
              Aucun résultat ne correspond à cette recherche
            </Trans>
          </div>
        )}
      </Card>

      {input.length > 2 && (
        <ul className="m-0 list-none rounded-md bg-white px-4">
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
