import Card from '@/design-system/layout/Card'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { NGCRules } from '@/types/model'
import Fuse from 'fuse.js'
import Image from 'next/image'
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
  const [results, setResults] = useState<
    Array<{
      item: SearchItem
      matches: Matches
    }>
  >([])

  const rulesList: any[] = Object.entries(rules).map(([dottedName, rule]) => ({
    ...rule,
    dottedName,
  }))

  const fuseSearchRef = useRef(
    () =>
      new Fuse(rules, {
        keys: searchWeights,
        includeMatches: true,
        minMatchCharLength: 2,
        useExtendedSearch: true,
        distance: 50,
        threshold: 0.3,
      })
  )

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
    [rules]
  )

  useEffect(() => {
    if (input.length < 3) {
      setResults([])
      return
    }

    const fuse = fuseSearchRef.current()
    const results = {
      ...fuse.search(input + '|' + input.replace(/ /g, '|')),
    }

    setResults(results)
  }, [searchIndex, input])

  const { t } = useTranslation()

  return (
    <>
      <label
        title={t('Entrez des mots clefs')}
        className="py-2 flex items-center h-8">
        <Image
          src="/images/1F50D.svg"
          width="100"
          height="100"
          className="w-12"
          alt=""
        />
        <input
          autoFocus
          type="search"
          value={input}
          placeholder={t('Entrez des mots clefs ici')}
          onChange={(e) => {
            const input = e.target.value

            setInput(input)
          }}
        />
      </label>
      {input.length > 2 && !results.length ? (
        <Card role="status" alert="info" className="p-2 rounded-sm mt-2">
          <Trans i18nKey="noresults">
            Aucun résultat ne correspond à cette recherche
          </Trans>
        </Card>
      ) : (
        input.length > 2 && (
          <ul className="pl-4 m-0 list-none">
            {(!results.length && !input.length
              ? searchIndex.map((item) => ({ item, matches: [] }))
              : results
            ).map(({ item, matches }) => (
              <RuleListItem
                key={item.dottedName}
                {...{ item, matches, rules }}
              />
            ))}
          </ul>
        )
      )}
    </>
  )
}
