import { NGCRules } from '@/types/model'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import Link from 'next/link'
import { Matches, SearchItem } from './SearchBar'

export default function RuleListItem({
  rules,
  item,
  matches = null,
}: {
  rules: NGCRules
  item: SearchItem
  matches: Matches | null
}) {
  return (
    <li
      key={item.dottedName}
      className="my-2 p-2 border-b border-solid border-primaryLight">
      <Link
        href={`/documentation/${encodeRuleName(item.dottedName)}`}
        className="decoration-none">
        <small className="block">
          {item.espace
            .slice(1)
            .reverse()
            .map((name) => (
              <span key={name}>
                {matches
                  ? matches.filter(
                      (m) => m.key === 'espace' && m.value === name
                    )
                  : name}{' '}
                ›{' '}
              </span>
            ))}
          <br />
        </small>
        <span
          css={`
            margin-right: 0.6rem;
          `}>
          {rules[item.dottedName]?.icônes}
        </span>
        {matches
          ? highlightMatches(
              item.title,
              matches.filter((m) => m.key === 'title')
            )
          : item.title}
      </Link>
    </li>
  )
}
